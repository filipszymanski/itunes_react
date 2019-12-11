import React, {Component} from 'react';
import Popup from "reactjs-popup";
import noScroll from "no-scroll";
import styles from './Popup.module.scss';

class CustomPopup extends Component {
    state = {
        open: false
    }

    openModal = () => {
        this.setState({open: true});
        this.setState({loaderVisible: true})
        noScroll.on();
    }
    closeModal = () => {
        setTimeout(() => {
            noScroll.off();
        },200)
        this.setState({open: false});
    }

    render() {
        return (
            <div>
                <button className={styles.ModalButton} onClick={this.openModal}>
                    More details
                </button>
                <Popup
                    open={this.state.open}
                    closeOnDocumentClick
                    onClose={this.closeModal}
                >
                    <div className={styles.Modal}>
                        <a href='/#' className={styles.Close} onClick={this.closeModal}>
                            <span className={styles.CloseIcon}></span>
                        </a>
                        <h3 className={styles.AlbumTitle}>{this.props.title}</h3>
                        <div className={styles.CoverWrapper}>
                            <img className={styles.CoverImage} src={this.props.cover} alt=""/>
                            <img src={this.props.cover} alt="" className={styles.VinylLabel}/>
                        </div>
                        <p className={styles.ModalArtist}>{this.props.artist}</p>
                        <p className={styles.ReleaseDate}>
                            Release date: {this.props.releasedate}
                        </p>
                        <hr className={styles.Divider}></hr>
                        <div className={styles.PriceWrapper}>
                            <div className={styles.PriceSlogan}>
                                Now only
                            </div>
                            <span className={styles.Price}>
                                {this.props.price}
                            </span>
                        </div>
                        <a href={this.props.link} target="_blank" rel="noopener noreferrer"
                           className={styles.ItunesButton}>buy on iTunes</a>
                    </div>
                </Popup>
            </div>
        )

    }
}

export default CustomPopup