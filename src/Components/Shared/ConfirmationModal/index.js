import React from "react";
import { Modal, Text, View } from "react-native";

import Button from "../Button";
import Line from "../Line";
import styles from "./styles";

const DeleteConfirmationModal = (props) => {
    let { showModal, toggleHandler, error, header, yesHandler } = props;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}

        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <Text style={styles.modalText}>{header}</Text>

                    <Line />

                    <Text style={styles.errorText}>{error}</Text>

                    <View style={styles.BtnContainer}>

                        <Button
                            backgroundColor="#ffffff"
                            btnText="No"
                            borderColor="#118936"
                            width={35}
                            marginTop={'0'}
                            color="#118936"
                            height={6.5}
                            handler={toggleHandler}
                        />

                        <Button
                            backgroundColor="#118936"
                            btnText="Yes"
                            borderColor="#118936"
                            width={35}
                            marginTop={'0'}
                            color="#ffffff"
                            height={6.5}
                            handler={yesHandler}
                        />
                    </View>

                </View>

            </View>

        </Modal>

    );
};
export default DeleteConfirmationModal;