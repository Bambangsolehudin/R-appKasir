// import logo from './logo.svg';
import React, { Component } from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import {Hasil, ListCategories, Menus} from '../components';
import {API_URL} from "../utils/constant";

import swal from 'sweetalert'

import axios from 'axios';

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menus: [],
      categoriYangDipilih: 'Makanan',
      keranjangs: []
    }
  }




  componentDidMount() {
    axios.get(API_URL+"products?category.nama="+this.state.categoriYangDipilih)
      .then(res => {
        console.log("Response :", res)
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log(error)
      })

      axios.get(API_URL+"keranjangs")
      .then(res => {
        console.log("Response :", res)
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch(error => {
        console.log(error)
      })
  }


  // Biar Ga reload
  componentDidUpdate(prevState) {
    if(this.state.keranjangs !== prevState.keranjangs) {
      axios.get(API_URL+"keranjangs")
      .then(res => {
        console.log("Response :", res)
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  changeCategory = (value)=> {
    this.setState({
      categoriYangDipilih: value,
      menus: []
    })

    axios.get(API_URL+"products?category.nama="+value)
    .then(res => {
      console.log("Response :", res)
      const menus = res.data;
      this.setState({ menus });
    })
    .catch(error => {
      console.log(error)
    })
  }

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error yaa ", error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error yaa ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  

  render() {
    const {menus, categoriYangDipilih, keranjangs} = this.state
    console.log(this.state.menus)
    return (
     
      <div className="mt-3">
        <Container fluid>  
        <Row>
        <ListCategories changeCategory = {this.changeCategory} categoriYangDipilih = {categoriYangDipilih}/>
        <Col>
          <h4>Daftar Product</h4>
          <hr />
          <Row>  
          {menus && menus.map((menu)=> (
                // <h2>{menu.nama}</h2>
                <Menus 
                 key={menu.id}
                 menu = {menu}
                 masukKeranjang={this.masukKeranjang}
                />
          ))}      
          </Row>
        </Col>
        <Hasil keranjangs = {keranjangs} {...this.props}/>
        </Row>
        </Container>
      </div>
    )
  }
}


