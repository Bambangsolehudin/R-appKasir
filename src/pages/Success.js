import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Image } from 'react-bootstrap'
import axios from 'axios';
import { API_URL } from '../utils/constant';

export default class Success extends Component {

    componentDidMount() {
        axios
        .get(API_URL+"keranjangs")
        .then(res => {
          console.log("Response :", res)
          const keranjangs = res.data;
          keranjangs.map(function(item) {
              return axios
                .delete(API_URL+"keranjangs/"+item.id)
                .then((res) => console.log(res))
                .catch((error) => console.log(error))
          }) 

          
        })
        .catch(error => {
          console.log(error)
        })
    }
    render() {
        return (
            <div className="mt-4 text-center">
                <Image src="sukses.png" width="500" />
                <h2> Sukses Pesan </h2>
                <p>Terimakasih telah memesan</p>
                
                <Button variant="primary" as={Link} to="/">
                    Kembali
                </Button>
            </div>
        )
    }
}
