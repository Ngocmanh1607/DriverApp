import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 10,
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    ratingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    averageRating: {
        fontSize: 36,
        fontWeight: '500',
    },
    starsRow: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    totalReviews: {
        fontSize: 16,
        color: '#777',
    },
    ratingList: {
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starText: {
        width: 30,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
        marginRight: 5,
    },
    countText: {
        width: 40,
        textAlign: 'right',
        fontSize: 14,
    },
})
export default styles;