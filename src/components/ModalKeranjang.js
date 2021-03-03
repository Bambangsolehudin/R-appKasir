import React from 'react'
import {Row, Badge, Col, ListGroup, ListGroupItem, Modal, Button, Form} from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPaste, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ModalKeranjang = ({
    showModal, 
    handleClose, 
    keranjangDetail, 
    jumlah,
    keterangan,
    tambah,
    kurang,
    changeHandler,
    handleSubmit,
    totalHarga,
    hapusPesanan
    }) => {
    if(keranjangDetail) {
        return (
            <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>
                {keranjangDetail.product.nama} { " " }
                <strong>
                    Rp. {numberWithCommas(keranjangDetail.product.harga)} 
                </strong>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Total Harga : </Form.Label>

                    <p>  Rp. {numberWithCommas(totalHarga)} </p>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Jumlah : </Form.Label>
                    <br />
                    <Button variant="primary" size="sm" className="mr-2" onClick={() => kurang()}>
                        <FontAwesomeIcon icon={faMinus} />
                    </Button>
                    <strong>{jumlah}</strong>

                    <Button variant="primary" size="sm" className="mt-2" onClick={() => tambah()}> 
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    
                

                </Form.Group>



                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Keterangan </Form.Label>
                    <Form.Control 
                    as="textarea" 
                    rows={3} 
                    name="keterangan" 
                    placeholder="cotoh:pedas"
                    value={keterangan}
                    onChange={(event)=> changeHandler(event)}
                    />

                </Form.Group>
                <Button variant="primary" type="submit">
                    Simpan
                </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id)}>
               <FontAwesomeIcon icon={faTrashAlt} /> Hapus Pesanan
            </Button>
            {/* <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button> */}
            </Modal.Footer>
            </Modal> 
        )
    }else{
        return (
            <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>
                kosong
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>kosong</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
            </Modal> 
        )
    }

}

export default ModalKeranjang
