import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    inputIcon: {
        marginLeft: 15,
        marginRight: 5,
    },
    textInput: {
        flex: 1,
        color: "#222222",
        fontSize: 16
    },
    forgotPassText: {
        color: "#FF0000",
        textAlign: 'right',
        width: '90%',
        fontSize: 16,
        marginVertical: 10,
    },
    loginButtonContainer: {
        width: '70%',
        height: 50,
        backgroundColor: "#FF0000",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textLogin: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    horizontalLine: {
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        width: '40%',
        alignSelf: 'center'
    },
    googleButtonContainer: {
        flexDirection: 'row',
        width: '70%',
        height: 50,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 10,
        elevation: 5,
    },
    textLoginGoogle: {
        color: '#222222',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 10,
        marginHorizontal: 40,
        marginVertical: 10,
        elevation: 10,
        alignItems: 'center',
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    errorText: {
        marginStart: 50,
        color: 'red',
        fontSize: 14
    },
});
export default styles