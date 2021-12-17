import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'
  import { ReactComponent as StraLogo } from '../assets/images/strateegiaLogo.svg';

const LoginModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalHeader>
                <StraLogo /> strateegia
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <h1>oi</h1>
            </ModalBody>
        </Modal>
    )
}

export default LoginModal;
