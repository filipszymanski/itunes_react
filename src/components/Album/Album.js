import React, {Component} from 'react';
import Popup from '../../components/Popup/Popup';
import styles from './Album.module.scss';

class Album extends Component {
    state = {
        isError: this.props.error
    }

    render() {

        let Album = null;
        if ( !this.state.isError ) {
            Album = this.props.albums.map( album => (
                album = <div className="col-sm-12 col-md-6 col-lg-4" key={ album.id }>
                    <article className={ styles.Album }>
                        <h1 className={ styles.AlbumTitle }>{ album.title }</h1>
                        <div>
                            <img className={ styles.AlbumCover } src={ album.cover } alt=""/>
                        </div>
                        <p className={ styles.AlbumArtist }>{ album.artist }</p>
                        <Popup
                            title={ album.title }
                            cover={ album.cover }
                            artist={ album.artist }
                            link={ album.itunesLink }
                            price={ album.price }
                            releasedate={ album.releaseDate }
                        />
                    </article>
                </div>
           ));
        }

        if ( this.props.albums.length === 0 ) {
            Album = <p className={ styles.NoResults }>We`re sorry :( there are no search results matching your keyword.</p>
        }

        if ( this.state.isError ) {
            Album = <p className={ styles.ErrorDuringFetch }>There was an error during fetch of albums</p>
        }
       
        return Album;
    }
}
  

export default Album;