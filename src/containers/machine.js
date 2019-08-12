// imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addBalance, updateCredit, updateQuantity} from '../actions/index';

// component
class Machine extends  Component {
    constructor(props){
        super(props);

        // state
        this.state = {
            currentCoins: 0,
            selectProduct: '',
            error: '',
            value: '',
            productRetrieved: ''
        }
}
    // render products
    showProducts = () => {
        const products = this.props.data.items;
        return products.map(product  => {
            const id = product.keyCode;
            return <li key={id} id={id} className={product.qtty <= 0 ? 'outofstock' : ''}>
                <span className="shape"></span>
                <span className="name">{product.name}</span>
                <span className="buyP">
                    <span className="price">{product.price}$</span>
                    <span>{product.keyCode}</span>
                    <span></span>
                </span>
                <span className="quantity">{product.qtty}</span>
            </li>
        });
    };
    // render display
    showDisplay = () => {
        return <div className="machine-display">
            <div className="display">
                <span>Your Credit is <b>{this.props.data.balance}$</b></span>
                <span>{this.props.data.balance <= 0 ? 'Please insert credit and select a product!' : 'Please select your product:'}</span>
                <span className="error">{this.state.error}</span>
                <span className="done"> {this.state.productRetrieved ? `You have successfully retrieved the following products: ${this.state.productRetrieved}`  : ''}</span>
                <span>{this.state.selectProduct && this.props.data.balance >= 10 ? this.state.selectProduct : ''}</span>
            </div>
            <div className="add-coins">
                <div className="col-sm-7 noPadding">
                    <input placeholder=" Add credit" className="addCredit" type="number" min="0" max="500" value={this.state.value} onChange={this.takeValueCoin} />
                </div>
                <div className="col-sm-5">
                    <button className="insert" onClick={this.handleUpdateCredit}>Insert</button>
                </div>
            </div>
        </div>
    };
    // select product
    selectProduct = (key) => {
        if(this.state.selectProduct.length <= 1) {
            this.setState({
                selectProduct: `${this.state.selectProduct}${key}`,
            });
        }
    };
    // render keyPad
    renderKeypad = () => {
        return this.props.data.keypad.map( key => {
            return <li key={key.id}>
                {this.props.data.balance >= 10 ?
                <button onClick={() => this.selectProduct(key.firstL)}>{key.firstL}</button> :
                // disabled if not enough credit
                <button disabled onClick={() => this.selectProduct(key.firstL)}>{key.firstL}</button>
                }
            </li>
        })
    };
    // take value coins
    takeValueCoin = (e) => this.setState({
        currentCoins: Number(e.target.value),
        error: '',
        value: e.target.value
    });
    // update credit
    handleUpdateCredit = () => {
        if(this.state.currentCoins > 0){
            this.props.addBalance(this.state.currentCoins);
            // reset input value
            this.setState({
                value: '',
                productRetrieved: '',
                currentCoins: '',
                selectProduct: '',
            });
        } else {
            this.setState({
                error: 'Pleasa enter a valid value.',
                productRetrieved: '',
            });
        }
    };
    // cancel order
    cancelOrder = () => this.setState({
       selectProduct: ''
    });
    // buy product
    buyProduct = () => {
        const { selectProduct } = this.state;
        if(selectProduct.length === 2){
            this.setState({
                error: ''
            });
            // product
            const productToGet = this.props.data.items.find(product => product.keyCode === selectProduct);
            if(productToGet){
                // if is enough credit to buy
                if(this.props.data.balance >= productToGet.price ) {
                    // if the product has qtty
                    if(productToGet.qtty > 0) {
                        this.setState({
                            selectProduct: '',
                            productRetrieved: productToGet.name
                        });
                        this.props.updateCredit(productToGet.price) ;
                        // update product count to store
                        this.props.updateQuantity(productToGet.keyCode, productToGet.qtty - 1);
                    } else {
                        this.props.updateQuantity(productToGet.keyCode, 0);
                        this.setState({
                            error: `There's no more ${productToGet.name} left.`,
                            selectProduct: '',
                            productRetrieved: ''
                        });
                    }
                // if is not enough credit but qtty > 0
                } else if(productToGet.qtty > 0) {
                    this.setState({
                        error: 'You dont have enough credit to buy this product!',
                        productRetrieved: '',
                        selectProduct: ''
                    });
                // if there's no qtty
                } else {
                    this.setState({
                        error: `There's no more ${productToGet.name} left.`,
                        selectProduct: '',
                        productRetrieved: ''
                    });
                }
            // if there's no product
            } else {
                this.setState({
                    error: 'We cannot find your product based on the code entered. Please try again.',
                    selectProduct: '',
                    productRetrieved: '',
                })
            }
        // if there's no digit code
        } else {
            this.setState({
                error: 'You should enter a 2 digit code, just as the ones shown on the products.',
                productRetrieved: '',
            })
        }
    };
    // render component
    render() {
        return (
            <div className="machine-wrap">
                <div className="machine-products col-sm-8">
                    <ul className="clearfix">{this.showProducts()}</ul>
                </div>
                <div className="machine-keypad col-sm-4 noPaddingRight">
                    {this.showDisplay()}
                    <ul className="clearfix">{this.renderKeypad()}</ul>
                    <ul className="clearfix"></ul>
                    <div className="buttons clearfix">
                        <button onClick={() => this.cancelOrder()}>Cancel</button>
                        <button onClick={() => this.buyProduct()}>Buy</button>
                    </div>

                </div>
            </div>
        )
    }
}
// reducer
function mapStateToProps({ data }){
    return {data}
}
// actions
const mapDispatchToProps = {
    addBalance,
    updateCredit,
    updateQuantity
};
// export component
export default  connect (mapStateToProps, mapDispatchToProps)(Machine);