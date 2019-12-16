import React, {Component} from 'react';
import styles from './Loader.module.scss'

class Loader extends Component {

    render() {
        let loader = null;
        if ( this.props.loaderVisible ){
            loader = <div className={ styles.LoaderWrapper }>
                <div className={ styles.GifLoader }>
                    <h1 className={ styles.LoaderText }>Wczytuje kot...</h1>
                </div>
            </div>
        }
        return loader;
    }
}

export default Loader;


