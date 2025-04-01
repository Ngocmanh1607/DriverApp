import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 10,
    },
    driverInfoContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        flexDirection: 'row'
    },
    resDetail: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    resDes: {
        fontSize: 16,
        fontWeight: '300',
        color: '#333'
    },
    markerText: {
        fontSize: 20,
    },
    driverDetails: {
        marginLeft: 10,
    },
    driverImage: {
        width: 60,
        height: 60,
        borderRadius: 10
    },
    driverInfo: {
        marginLeft: 10,
    },
    driverName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    driverRating: {
        color: '#888',
    },
    orderItemContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    orderItemDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderItemImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    orderItemText: {
        flex: 1,
    },
    orderItemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    orderItemOption: {
        color: '#888',
        fontSize: 14,
    },
    orderInfPay: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    orderInfPayText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    paymentInfoContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 10,
    },
    orderIdContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderUser: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    orderId: {
        fontSize: 14,
        fontWeight: '600',
        color: "#333"
    },
    orderTime: {
        fontSize: 14,
        color: '#888',
    },
    paymentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    paymentSumContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#666',
        marginTop: 10,
        paddingTop: 10
    },
    completeButton: {
        backgroundColor: '#FF0000',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    completeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    paymentText: {
        fontSize: 16,
        color: '#333'
    },
});
export default styles;