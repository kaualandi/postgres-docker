import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { Md5 } from 'md5-typescript';
import { FormEvent, useEffect, useState } from 'react';

interface ModalComponentProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ModalComponent({
  isOpen,
  onOpenChange,
}: ModalComponentProps) {
  const [password, setPassword] = useState('');

  useEffect(() => {
    setPassword('');
  }, [isOpen]);

  function handleSubmit(e: FormEvent, onClose: () => void) {
    e.preventDefault();

    localStorage.setItem('rootPassword', Md5.init(password));
    onClose();
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={(e) => handleSubmit(e, onClose)}>
              <ModalHeader>Senha Root</ModalHeader>
              <ModalBody>
                <Input
                  type='password'
                  placeholder='Digite a senha root'
                  required
                  value={password}
                  onValueChange={setPassword}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Fechar
                </Button>
                <Button color='primary' variant='flat' type='submit'>
                  Salvar
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
