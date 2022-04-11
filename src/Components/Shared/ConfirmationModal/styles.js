import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        width: "90%",
        padding: responsiveWidth(8),
        borderRadius: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalText: {
        marginBottom: responsiveHeight(1),
        color: "black",
        fontSize: responsiveFontSize(2.3),
        fontWeight: "700",
        alignSelf: "flex-start"
    },
    BtnContainer: {
        flexDirection: "row",
        width: responsiveWidth(90),
        height: responsiveWidth(12),
        justifyContent: "space-around",
    },
    errorText: {
        marginBottom: responsiveHeight(3),
        color: "black",
        fontSize: responsiveFontSize(2.2),
        alignSelf: "flex-start"
    },
});