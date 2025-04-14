import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  acceptOrder,
  confirmOrder,
  getInfoUser,
  giveOrder,
  rejectOrder,
} from '../api/driverApi';
import socket from '../api/socket';
import styles from '../assets/css/MainStyle';
// import { requestLocationPermission } from '../utils/requestPermission';
import Geolocation from 'react-native-geolocation-service';
const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Quyền truy cập vị trí',
        message: 'Ứng dụng này cần quyền truy cập vị trí của bạn.',
        buttonNeutral: 'Hỏi lại sau',
        buttonNegative: 'Hủy',
        buttonPositive: 'Đồng ý',
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
  const [shipperLocation, setShipperLocation] = useState(null);
  const [driver_id, setDriverId] = useState(null);
  const [restaurantLocation, setRestaurantLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [route1, setRoute1] = useState([]);
  const [route2, setRoute2] = useState([]);
  const [ordersNew, setOrdersNew] = useState();

  // Lấy ID tài xế khi khởi tạo
  useEffect(() => {
    const fetchDriverId = async () => {
      try {
        await getInfoUser();
        const id = await AsyncStorage.getItem('driverId');
        console.log('id shipper: ', id);

        setDriverId(id);
        socket.connect();
      } catch (error) {
        console.error('Lỗi khi lấy ID tài xế:', error);
      }
    };

    fetchDriverId();
  }, []);

  // Cập nhật vị trí tài xế lên server và lưu vào AsyncStorage
  useEffect(() => {
    if (driver_id && shipperLocation) {
      socket.emit('updateLocation', {
        driverId: driver_id,
        latitude: shipperLocation.latitude,
        longitude: shipperLocation.longitude,
      });
      // Lưu vị trí shipper vào AsyncStorage
      AsyncStorage.setItem('shipperLocation', JSON.stringify(shipperLocation));
    }
  }, [shipperLocation, driver_id]);

  // Xử lý các sự kiện socket
  useEffect(() => {
    if (!driver_id) return;

    const handleOrderReceived = orders => {
      if (orders) {
        console.log('Danh sách đơn hàng:', orders.orders);
        setOrdersNew(orders.orders);
      }
    };

    const handleOrdersList = orders => {
      if (
        !ordersNew &&
        orders.order_status !== 'ORDER_CONFIRMED' &&
        orders.order_status !== 'ORDER_CANCELED'
      ) {
        setOrdersNew(orders);
      }
    };

    socket.on('connect', () => socket.emit('joinDriver', driver_id));
    socket.on('orderReceivedByDriver', handleOrderReceived);
    socket.on('ordersListOfDriver', handleOrdersList);
    socket.on('error', error => console.error('Lỗi socket:', error.message));

    return () => {
      socket.off('connect');
      socket.off('orderReceivedByDriver');
      socket.off('ordersListOfDriver');
      socket.off('error');
    };
  }, [driver_id, ordersNew]);

  // Theo dõi vị trí tài xế
  useEffect(() => {
    let watchId;
    const watchShipperLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        console.log('Chưa được cấp quyền truy cập vị trí.');
        return;
      }
      watchId = Geolocation.watchPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setShipperLocation({latitude, longitude});
        },
        error => console.error('Lỗi khi lấy vị trí:', error.message),
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          interval: 10000,
        },
      );
    };

    watchShipperLocation();
    return () => {
      if (watchId) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);

  // Cập nhật tuyến đường khi có thay đổi
  useEffect(() => {
    if (ordersNew && shipperLocation && restaurantLocation && userLocation) {
      getRoute(shipperLocation, restaurantLocation, setRoute1);
      getRoute(restaurantLocation, userLocation, setRoute2);
    }
  }, [ordersNew, shipperLocation, restaurantLocation, userLocation]);

  // Lưu tuyến đường và vị trí vào bộ nhớ
  useEffect(() => {
    const saveUpdatedRoutes = async () => {
      try {
        if (route1?.length > 0 && route2?.length > 0) {
          await AsyncStorage.setItem(
            'routes',
            JSON.stringify({
              route1,
              route2,
              restaurantLocation,
              shipperLocation,
            }),
          );
          console.log('Đã lưu tuyến đường và vị trí thành công');
        }
      } catch (error) {
        console.error('Lỗi khi lưu tuyến đường và vị trí:', error);
      }
    };

    saveUpdatedRoutes();
  }, [route1, route2, restaurantLocation, shipperLocation]);

  // Khôi phục tuyến đường và vị trí từ bộ nhớ
  useEffect(() => {
    const restoreRoutesFromStorage = async () => {
      try {
        const savedRoutes = await AsyncStorage.getItem('routes');
        if (savedRoutes) {
          const {
            route1: savedRoute1 = [],
            route2: savedRoute2 = [],
            restaurantLocation: savedRestaurantLocation,
            shipperLocation: savedShipperLocation,
          } = JSON.parse(savedRoutes);

          setRoute1(Array.isArray(savedRoute1) ? savedRoute1 : []);
          setRoute2(Array.isArray(savedRoute2) ? savedRoute2 : []);
          if (savedRestaurantLocation)
            setRestaurantLocation(savedRestaurantLocation);
          if (savedShipperLocation) setShipperLocation(savedShipperLocation);
        }
      } catch (error) {
        console.error('Lỗi khi khôi phục tuyến đường và vị trí:', error);
      }
    };

    restoreRoutesFromStorage();
  }, []);

  const clearRoutesFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('routes');
    } catch (error) {
      console.error('Lỗi khi xóa tuyến đường:', error);
    }
  };

  const getRoute = async (origin, destination, setRoute) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?geometries=geojson&access_token=sk.eyJ1IjoibmdvY21hbmgxNjA3IiwiYSI6ImNtM2N5bzY5dDFxbDIyanIxbDEycXg0bGwifQ.M2rY0iFiThl6Crjp6kr_GQ`,
      );
      const routeCoordinates = response.data.routes[0].geometry.coordinates.map(
        point => ({latitude: point[1], longitude: point[0]}),
      );
      setRoute(routeCoordinates);
    } catch (error) {
      console.error('Lỗi khi lấy tuyến đường:', error);
    }
  };

  const handlePress = () => {
    navigation.navigate('OrderDetail', {ordersNew});
  };

  const handleAccept = async () => {
    try {
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

        setOrdersNew(prev => ({
          ...prev,
          order_status: 'DELIVERING',
        }));
      }
    } catch (error) {
      console.error('Lỗi khi chấp nhận đơn hàng:', error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectOrder(ordersNew.id);
      resetOrderState();
    } catch (error) {
      console.error('Lỗi khi từ chối đơn hàng:', error);
    }
  };

  const handleComplete = async () => {
    try {
      await confirmOrder(ordersNew.id);
      setOrdersNew(prev => ({
        ...prev,
        order_status: 'ORDER_CONFIRMED',
      }));
      resetOrderState();
      clearRoutesFromStorage();
    } catch (error) {
      console.error('Lỗi khi hoàn thành đơn hàng:', error);
    }
  };

  const handleGiveOrder = async () => {
    try {
      await giveOrder(ordersNew.id);
      setOrdersNew(prev => ({
        ...prev,
        order_status: 'ORDER_RECEIVED',
      }));
    } catch (error) {
      console.error('Lỗi khi giao đơn hàng:', error);
    }
  };

  const resetOrderState = () => {
    setOrdersNew(null);
    setRoute1([]);
    setRoute2([]);
    setRestaurantLocation(null);
    setUserLocation(null);
  };

  const renderOrderStatus = () => {
    if (!ordersNew) {
      return (
        <View style={styles.noOrderContainer}>
          <Text style={styles.noOrderText}>Chưa có đơn hàng mới</Text>
        </View>
      );
    }

    switch (ordersNew.order_status) {
      case 'PREPARING_ORDER':
        return (
          <>
            <TouchableOpacity
              style={[styles.acceptButton, {backgroundColor: '#33CC66'}]}
              onPress={handleAccept}>
              <Text style={styles.buttonText}>Chấp nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.rejectButton, {backgroundColor: '#FF4D4D'}]}
              onPress={handleReject}>
              <Text style={styles.buttonText}>Từ chối</Text>
            </TouchableOpacity>
          </>
        );
      case 'DELIVERING':
        return (
          <TouchableOpacity
            style={[styles.acceptButton, {backgroundColor: '#FF0000'}]}
            onPress={handleGiveOrder}>
            <Text style={styles.buttonText}>Nhận đơn hàng</Text>
          </TouchableOpacity>
        );
      case 'ORDER_RECEIVED':
        return (
          <TouchableOpacity
            style={[styles.acceptButton, {backgroundColor: '#FF0000'}]}
            onPress={handleComplete}>
            <Text style={styles.buttonText}>Hoàn tất</Text>
          </TouchableOpacity>
        );
      case 'ORDER_CONFIRMED':
        return <Text>Giao hàng thành công</Text>;
      case 'ORDER_CANCELED':
        return (
          <View style={styles.noOrderContainer}>
            <Text style={styles.noOrderText}>Chưa có đơn hàng mới</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          centerCoordinate={
            shipperLocation
              ? [shipperLocation.longitude, shipperLocation.latitude]
              : [0, 0]
          }
          zoomLevel={17}
          animationDuration={1000}
        />

        {shipperLocation && (
          <MapboxGL.PointAnnotation
            id="shipperMarker"
            coordinate={[shipperLocation.longitude, shipperLocation.latitude]}>
            <View>
              <Text style={styles.markerText}>📍</Text>
            </View>
          </MapboxGL.PointAnnotation>
        )}

        {ordersNew && restaurantLocation && (
          <MapboxGL.PointAnnotation
            id="restaurantMarker"
            coordinate={[
              restaurantLocation.longitude,
              restaurantLocation.latitude,
            ]}>
            <View>
              <Text style={styles.markerText}>🏡</Text>
            </View>
          </MapboxGL.PointAnnotation>
        )}

        {ordersNew && userLocation && (
          <MapboxGL.PointAnnotation
            id="userMarker"
            coordinate={[userLocation.longitude, userLocation.latitude]}>
            <View>
              <Text style={styles.markerText}>🏡</Text>
            </View>
          </MapboxGL.PointAnnotation>
        )}

        {ordersNew && route1 && (
          <MapboxGL.ShapeSource
            id="route1"
            shape={{
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: route1.map(coord => [
                  coord.longitude,
                  coord.latitude,
                ]),
              },
            }}>
            <MapboxGL.LineLayer
              id="lineLayer1"
              style={{
                lineColor: '#FF5733',
                lineWidth: 3,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
          </MapboxGL.ShapeSource>
        )}

        {ordersNew && route2 && (
          <MapboxGL.ShapeSource
            id="route2"
            shape={{
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: route2.map(coord => [
                  coord.longitude,
                  coord.latitude,
                ]),
              },
            }}>
            <MapboxGL.LineLayer
              id="lineLayer2"
              style={{
                lineColor: '#33FF57',
                lineWidth: 3,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
          </MapboxGL.ShapeSource>
        )}
      </MapboxGL.MapView>

      <View style={styles.orderCard}>
        {ordersNew ? (
          <>
            <View style={styles.orderHeaderContainer}>
              <Text style={styles.orderTitle}>Đơn hàng mới</Text>
              <View style={styles.actionsContainer}>
                {/* Detail button */}
                <TouchableOpacity onPress={handlePress}>
                  <Text style={styles.detail}>Chi tiết</Text>
                </TouchableOpacity>
                {/* Chat icon button */}
                <TouchableOpacity
                  style={styles.chatIconButton}
                  onPress={() =>
                    navigation.navigate('ChatWithUser', {
                      customerId: ordersNew.customer_id,
                      driverId: driver_id,
                    })
                  }>
                  <Icon name="chat-outline" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.addressContainer}>
              <Text style={styles.address}>
                📍 {ordersNew.Restaurant.address}
              </Text>
              <Text style={styles.address}>
                📍 {ordersNew.address_receiver}
              </Text>
            </View>

            <View style={styles.buttonContainer}>{renderOrderStatus()}</View>
          </>
        ) : (
          <View style={styles.noOrderContainer}>
            <Text style={styles.noOrderText}>Chưa có đơn hàng mới</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default MainScreen;
