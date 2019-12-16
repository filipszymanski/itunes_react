import React, {Component} from 'react';
import axios from 'axios';
import Album from '../../components/Album/Album';
import Loader from '../../components/Loader/Loader';
import Search from '../../components/Search/Search';
import ScrollTop from '../../components/ScrollTop/ScrollTop';
import styles from './Albums.module.scss';

class Albums extends Component {
    state = {
        albums: [],
        initialAlbums: [],
        error: false,
        loaderVisible: true,
        query: '',
        inputValue: ''
    };

   
    componentDidMount() {

        // GET albums
        axios.get( 'https://itunes.apple.com/us/rss/topalbums/limit=100/json' )
            .then(response => {
                let albums = response.data.feed.entry;
                albums = albums.map( album => (
                     album = {
                        artist: album['im:artist'].label,
                        cover: album['im:image'][2].label,
                        id: album.id.attributes['im:id'],
                        itunesLink: album.id.label,
                        price: album['im:price'].label,
                        releaseDate: album['im:releaseDate'].attributes.label,
                        title: album['im:name'].label 
                    }
                ));
  
                this.setState({ 
                    albums: albums, 
                    initialAlbums: albums, 
                    loaderVisible: false 
                });
            })
            .catch(error => {
                this.setState({ error: true });
            });
            
    }

    filterAlbums = keyword => {
        const { initialAlbums } = this.state;
        const keywordLowercase = keyword.toLowerCase();
        const searchArray = initialAlbums;

        Object.filter = ( obj, predicate ) =>
            Object.keys( obj )
                .filter( key => predicate( obj[key]) )
                // eslint-disable-next-line
                .reduce(( res, key ) => ( res[key] = obj[key], res ), {});

               
        const resultArray = Object.filter( searchArray, obj => obj.title.toLowerCase().includes( keywordLowercase ) || obj.artist.toLowerCase().includes( keywordLowercase ));
        const convertedArray = Object.keys( resultArray ).map( key => {
            return resultArray[key];
        });
        this.setState({ albums: convertedArray })
    };

    handleSearchCancel = () => {
        const { initialAlbums } = this.state;
        this.setState({
            albums: initialAlbums,
            query: null,
            inputValue: ''
        });
    }

    handleInputChange = event => {
        this.setState({ 
            query: event.target.value ,
            inputValue: event.target.value
            }, () => {
            const { query, initialAlbums } = this.state;
            query && query.length > 1 ? this.filterAlbums( query ) : this.setState({ albums: initialAlbums });
        });
    }

    render() {

        const { loaderVisible, inputValue, albums, error } = this.state;

        return (
            <div className="container">
                <Loader
                    loaderVisible={ loaderVisible }
                />
                <ScrollTop scrollStepInPx="50" delayInMs="0"/>
                <div className={ styles.SiteLogo }></div>
                <h1 className={ styles.MainTitle }>Top 100 USA albums on iTunes</h1>
                <Search
                    changed={ this.handleInputChange }
                    searchcancel={ this.handleSearchCancel }
                    inputValue={ inputValue }
                />
                <section className={ styles.Albums }>
                    <div className="row">
                        <Album
                        loaderStatus={ loaderVisible }
                        albums={ albums }
                        error={ error }
                        />
                    </div>
                </section>
                <div className={ styles.HeartWrapper }>
                    <div className={ styles.FavHeartText }>Made with</div>
                    <div className={ styles.FavHeart }></div>
                </div>
            </div>
        );
    }
}

export default Albums;