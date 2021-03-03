import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';
import {API_URL} from "../utils/constant";


export default class TotalBayar extends Component {
    submitTotalBayar = (totalBayar) => {
        const pesanan = {
            total_bayar: totalBayar,
            menus: this.props.keranjangs
        }

        axios.post(API_URL+"pesanans",pesanan).then((res)=> {
            this.props.history.push('/success')
        })
    }
    render() {
        const totalBayar = this.props.keranjangs.reduce(function(result, item) {
            return result + item.total_harga
        }, 0)
        return (
            <div className="fixed-button">
                <Row>
                    <Col>
                        <h4> Total Harga : <strong>{ numberWithCommas(totalBayar) }</strong> </h4>
                        <Button v
                        ariant="primary" 
                        className="mb-2 mt-2 mr-2" 
                        size="lg" 
                        onClick={ () => this.submitTotalBayar(totalBayar)}
                        >
                           <FontAwesomeIcon /> Bayar
                        </Button>
                    </Col>

                </Row>
                
            </div>
        )
    }
}
