import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20
    },
    button: {
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    linkButton: {
        marginTop: 15
    },
    linkText: {
        color: '#007bff',
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    topImageContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    topImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    }
});
export default styles;