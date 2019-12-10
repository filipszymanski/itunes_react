import React from 'react';
import Popup from '../../components/Popup/Popup';
import styles from './Album.module.scss';

const album = (props) => (

    <div className="col-sm-12 col-md-6 col-lg-4">
        <article className={styles.Album} onClick={props.clicked}>
            <h1 className={styles.AlbumTitle}>{props.title}</h1>
            <div>
                <img className={styles.AlbumCover} src={props.cover} alt=""/>
            </div>
            <p className={styles.AlbumArtist}>{props.artist}</p>
            <Popup
                title={props.title}
                cover={props.cover}
                artist={props.artist}
                link={props.link}
                price={props.price}
                releasedate={props.releasedate}
            />
        </article>
    </div>

);

export default album;