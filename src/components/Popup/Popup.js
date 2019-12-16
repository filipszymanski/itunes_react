import React, {Component} from 'react';
import Popup from "reactjs-popup";
import noScroll from "no-scroll";
import styles from './Popup.module.scss';

class CustomPopup extends Component {
    state = {
        open: false
    }

    openModal = () => {
        this.setState({ 
            open: true, 
            loaderVisible: true 
        });
        noScroll.on();
    }
    closeModal = () => {
        setTimeout(() => {
            noScroll.off();
        },200)
        this.setState({ open: false });
    }

    render() {
        const { title, cover, artist, releasedate, price, link } = this.props;
        return (
            <div>
                <button className={ styles.ModalButton } onClick={ this.openModal }>
                    More details
                </button>
                <Popup
                    open={ this.state.open }
                    closeOnDocumentClick
                    onClose={ this.closeModal }
                >
                    <div className={ styles.Modal }>
                        <a href='/#' className={ styles.Close } onClick={ this.closeModal }>
                            <span className={ styles.CloseIcon }></span>
                        </a>
                        <h3 className={ styles.AlbumTitle }>{ title }</h3>
                        <div className={ styles.CoverWrapper }>
                            <img className={ styles.CoverImage } src={ cover } alt=""/>
                            <img src={ cover } alt="" className={ styles.VinylLabel }/>
                        </div>
                        <p className={ styles.ModalArtist }>{ artist }</p>
                        <p className={ styles.ReleaseDate }>
                            Release date: { releasedate }
                        </p>
                        <hr className={ styles.Divider }></hr>
                        <div className={ styles.PriceWrapper }>
                            <div className={ styles.PriceSlogan }>
                                Now only
                            </div>
                            <span className={ styles.Price }>
                                { price }
                            </span>
                        </div>
                        <a href={ link } target="_blank" rel="noopener noreferrer"
                           className={ styles.ItunesButton }>buy on iTunes</a>
                    </div>
                </Popup>
            </div>
        )

    };
};

export default CustomPopup;