import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { acceptOrder, confirmOrder, getInfoUser, giveOrder, rejectOrder } from '../api/driverApi';
const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'This app requires access to your location.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
        const status = await Geolocation.requestAuthorization('whenInUse');
        return status === 'granted';
    }
};

const MainScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [shipperLocation, setShipperLocation] = useState(null);
    const [driverId, setDriverId] = useState(null);
    const [restaurantLocation, setRestaurantLocation] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [route1, setRoute1] = useState();
    const [route2, setRoute2] = useState();
    const [ordersNew, setOrdersNew] = useState();

    useEffect(() => {
        const socket = io('http://localhost:3000');
        if (driverId && shipperLocation) {
            socket.emit('updateLocation', {
                driverId,
                latitude: shipperLocation.latitude,
                longitude: shipperLocation.longitude,
            });
        }
    }, [shipperLocation, driverId]);
    useEffect(() => {
        if (!driverId) return;

        const socket = io('http://localhost:3000');

        socket.on('connect', () => {
            console.log('Connected to the server:', socket.id);
            socket.emit('joinDriver', driverId);
        });

        socket.on('orderReceivedByDriver', (orders) => {
            if (orders) {
                console.log('Danh sách đơn hàng:', orders.orders);
                setOrdersNew(orders.orders);
            }
        });
        socket.on('ordersListOfDriver', (orders) => {
            if (!ordersNew && orders.order_status != 'ORDER_CONFIRMED' && orders.order_status != 'ORDER_CANCELED')
                setOrdersNew(orders)
        });

        socket.on('error', (error) => console.error('Lỗi socket:', error.message));

        return () => {
            socket.disconnect();
        };
    }, [driverId]);
    //Lây driverID
    useEffect(() => {
        const fetchDriverId = async () => {
            try {
                await getInfoUser();
                const id = await AsyncStorage.getItem('driverId');
                setDriverId(id);
            } catch (error) {
                console.error('Error fetching driver ID:', error);
            }
        };

        fetchDriverId();
    }, []);

    //Vị trí driver
    useEffect(() => {
        const watchShipperLocation = async () => {
            const hasPermission = await requestLocationPermission();
            if (!hasPermission) {
                console.log('Location permission not granted.');
                return;
            }

            Geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('Location fetched:', latitude, longitude);
                    setShipperLocation({ latitude, longitude });
                },
                (error) => console.error('Error fetching location:', error.message),
                { enableHighAccuracy: true, distanceFilter: 10, interval: 10000 }
            );
        };

        watchShipperLocation();
    }, [shipperLocation]);

    useEffect(() => {
        if (ordersNew && shipperLocation && restaurantLocation && userLocation) {
            getRoute(shipperLocation, restaurantLocation, setRoute1);
            getRoute(restaurantLocation, userLocation, setRoute2);
        }
    }, [ordersNew, shipperLocation, restaurantLocation, userLocation]);

    const getRoute = async (origin, destination, setRoute) => {
        try {
            const response = await axios.get(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?geometries=geojson&access_token=sk.eyJ1IjoibmdvY21hbmgxNjA3IiwiYSI6ImNtM2N5bzY5dDFxbDIyanIxbDEycXg0bGwifQ.M2rY0iFiThl6Crjp6kr_GQ`
            );
            const routeCoordinates = response.data.routes[0].geometry.coordinates.map(
                (point) => ({ latitude: point[1], longitude: point[0] })
            );
            setRoute(routeCoordinates);
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    };

    const handlePress = () => {
        navigation.navigate("OrderDetail", { ordersNew })
    }
    const handleAccept = () => {
        const fetchAcceptOrder = async () => {
            const response = await acceptOrder(ordersNew.id);
            if (response.latitudeUser && response.longtitudeUser) {
                const updatedUserLocation = {
                    latitude: parseFloat(response.latitudeUser),
                    longitude: parseFloat(response.longtitudeUser),
                };
                const updatedResLocation = {
                    latitude: parseFloat(response.latitudeRes),
                    longitude: parseFloat(response.longtitudeRes),
                };
                setUserLocation(updatedUserLocation);
                setRestaurantLocation(updatedResLocation);
                getRoute(shipperLocation, updatedResLocation, setRoute1);
                getRoute(updatedResLocation, updatedUserLocation, setRoute2);
                // Cập nhật trạng thái đơn hàng
                setOrdersNew((prevOrders) => ({
                    ...prevOrders,
                    order_status: "DELIVERING",
                }));
            } else {
                console.error("Invalid location data:", response);
            }
        };

        fetchAcceptOrder();

    };
    const handleReject = () => {
        const fetchRejectOrder = async () => {
            const response = await rejectOrder(ordersNew.id);
        }
        fetchRejectOrder();
        setOrdersNew((prevOrders) => ({
            ...prevOrders,
            order_status: "ORDER_CANCELED",
        }));
        setOrdersNew();
        setRoute1();
        setRoute2();
        setRestaurantLocation();
        setUserLocation();
    }
    const handleComplete = () => {
        const fetchConfirmOrder = async () => {
            await confirmOrder(ordersNew.id);
        }
        fetchConfirmOrder();
        setOrdersNew((prevOrders) => ({
            ...prevOrders,
            order_status: "ORDER_CONFIRMED", // Thay đổi trạng thái thành "ACCEPTED"
        }));
        setOrdersNew();
        setRoute1();
        setRoute2();
        setRestaurantLocation();
        setUserLocation();
    }
    const handleGiveOrder = () => {
        const fetchGiveOrder = async () => {
            await giveOrder(ordersNew.id);
        }
        fetchGiveOrder();
        setOrdersNew((prevOrders) => ({
            ...prevOrders,
            order_status: "GIVED ORDER", // Thay đổi trạng thái thành "ACCEPTED"
        }));
    }
    return (
        <View style={styles.container}>
            <MapboxGL.MapView style={styles.map}>
                <MapboxGL.Camera
                    centerCoordinate={
                        shipperLocation ? [shipperLocation.longitude, shipperLocation.latitude] : [0, 0]
                    }
                    zoomLevel={13}
                    animationDuration={1000}
                />

                {shipperLocation && (
                    <MapboxGL.PointAnnotation
                        id="customMarker"
                        coordinate={[shipperLocation.longitude, shipperLocation.latitude]}
                    >
                        <View>
                            <Text style={styles.markerText}>🛵</Text>
                        </View>
                    </MapboxGL.PointAnnotation>
                )}
                {ordersNew && restaurantLocation && (
                    <MapboxGL.PointAnnotation
                        id="customMarker"
                        coordinate={[restaurantLocation.longitude, restaurantLocation.latitude]}
                    >
                        <View>
                            <Text style={styles.markerText}>🏡</Text>
                        </View>
                    </MapboxGL.PointAnnotation>
                )}

                {ordersNew && userLocation && (
                    <MapboxGL.PointAnnotation
                        id="customMarker"
                        coordinate={[userLocation.longitude, userLocation.latitude]}
                    >
                        <View>
                            <Text style={styles.markerText}>🏡</Text>
                        </View>
                    </MapboxGL.PointAnnotation>
                )}

                {/* Route từ shipper đến nhà hàng */}
                {ordersNew && route1 && (
                    <MapboxGL.ShapeSource id="route1" shape={{
                        type: 'Feature',
                        geometry: {
                            type: 'LineString',
                            coordinates: route1.map(coord => [coord.longitude, coord.latitude])
                        }
                    }}>
                        <MapboxGL.LineLayer id="lineLayer1" style={{ lineColor: "#FF5733", lineWidth: 4 }} />
                    </MapboxGL.ShapeSource>
                )}

                {/* Route từ nhà hàng đến user */}
                {ordersNew && route2 && (
                    <MapboxGL.ShapeSource id="route2" shape={{
                        type: 'Feature',
                        geometry: {
                            type: 'LineString',
                            coordinates: route2.map(coord => [coord.longitude, coord.latitude])
                        }
                    }}>
                        <MapboxGL.LineLayer id="lineLayer2" style={{ lineColor: "#33FF57", lineWidth: 4 }} />
                    </MapboxGL.ShapeSource>
                )}

            </MapboxGL.MapView>

            {/* Floating Order Card */}
            <View style={styles.orderCard}>
                {ordersNew ? (
                    <>
                        <View style={styles.orderDetailContainer}>
                            <Text style={styles.orderTitle}>Đơn hàng mới</Text>
                            <TouchableOpacity onPress={() => handlePress()}>
                                <Text style={styles.detail}>Chi tiết</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.address}>📍 {ordersNew.Restaurant.address}</Text>
                        <Text style={styles.address}>📍 {ordersNew.address_receiver}</Text>

                        <View style={styles.buttonContainer}>
                            {ordersNew.order_status === "PREPARING_ORDER" ? (
                                <>
                                    <TouchableOpacity
                                        style={[styles.acceptButton, { backgroundColor: "#33CC66" }]}
                                        onPress={() => handleAccept()}
                                    >
                                        <Text style={styles.buttonText}>Accept</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.rejectButton, { backgroundColor: "#FF4D4D" }]}
                                        onPress={() => handleReject()}
                                    >
                                        <Text style={styles.buttonText}>Reject</Text>
                                    </TouchableOpacity>
                                </>
                            ) : ordersNew.order_status === "DELIVERING" ? (
                                <TouchableOpacity
                                    style={[styles.acceptButton, { backgroundColor: "#FF0000" }]}
                                    onPress={() => handleGiveOrder()}
                                >
                                    <Text style={styles.buttonText}>Nhận đơn hàng</Text>
                                </TouchableOpacity>
                            ) : (
                                ordersNew.order_status === "GIVED ORDER" ? (
                                    <TouchableOpacity
                                        style={[styles.acceptButton, { backgroundColor: "#FF0000" }]}
                                        onPress={() => handleComplete()}
                                    >
                                        <Text style={styles.buttonText}>Hoàn tất</Text>
                                    </TouchableOpacity>
                                ) : ordersNew.order_status === "ORDER_CANCELED" ? (
                                    <View style={styles.noOrderContainer}>
                                        <Text style={styles.noOrderText}>Chưa có đơn hàng mới</Text>
                                    </View>
                                ) : (
                                    <Text>Giao hàng thành công</Text>
                                ))}
                        </View>

                    </>) : (
                    <View style={styles.noOrderContainer}>
                        <Text style={styles.noOrderText}>Chưa có đơn hàng mới</Text>
                    </View>
                )
                }
            </View >
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    orderCard: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    orderTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    orderDetail: {
        fontSize: 14,
        marginBottom: 4,
    },
    detail: {
        color: 'red',
        fontWeight: 'bold',
    },
    address: {
        fontSize: 14,
        color: '#333',
        marginBottom: 2,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    rejectButton: {
        flex: 1,
        backgroundColor: '#FF4D4D',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    acceptButton: {
        flex: 1,
        backgroundColor: '#33CC66',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 8
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    orderDetailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    noOrderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noOrderText: {
        fontSize: 16,
        fontWeight: '500',
    },
    markerText: {
        fontSize: 20,
    },
});

export default MainScreen;

