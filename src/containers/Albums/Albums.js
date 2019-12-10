import React, {Component} from 'react';
import axios from 'axios';
import Album from '../../components/Album/Album';
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
        axios.get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
            .then(response => {
                const albums = response.data.feed.entry;
                this.setState({albums: albums});
                this.setState({initialAlbums: albums});
                this.setState({loaderVisible: false});
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    filterAlbums = (keyword) => {
        const keywordLowercase = keyword.toLowerCase();
        const searchArray = this.state.initialAlbums;

        Object.filter = (obj, predicate) =>
            Object.keys(obj)
                .filter(key => predicate(obj[key]))
                // eslint-disable-next-line
                .reduce((res, key) => (res[key] = obj[key], res), {});

        const resultArray = Object.filter(searchArray, obj => (obj['im:name'].label).toLowerCase().includes(keywordLowercase) || obj['im:artist'].label.toLowerCase().includes(keywordLowercase));
        const convertedArray = Object.keys(resultArray).map(key => {
            return resultArray[key];
        });
        this.setState({albums: convertedArray})
    };

    handleSearchCancel = () => {
        this.setState({albums: this.state.initialAlbums});
        this.setState({query: null});
        this.setState({inputValue: ''});
    }

    handleInputChange = (event) => {
        this.setState({inputValue: event.target.value});
        this.setState({
            query: event.target.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                this.filterAlbums(this.state.query);
            } else {
                this.setState({albums: this.state.initialAlbums});
            }
        })
    }

    render() {
        let loader = null;
        if (this.state.loaderVisible) {
            loader = <div className={styles.LoaderWrapper}>
                <div className={styles.GifLoader}>
                    <h1 className={styles.LoaderText}>Wczytuje kot...</h1>
                </div>
            </div>;
        }
        let albums = <p style={{textAlign: 'center'}}>There was an error during fetch of albums</p>;
        if (this.state.albums) {
            albums =
                <p className="zonk" style={{textAlign: 'center'}}>We`re sorry :( there are no search results matching
                    your keyword</p>;
        }
        if (!this.state.error) {
            albums = this.state.albums.map(album => {
                return <Album
                    albumId={album.id.attributes['im:id']}
                    key={album.id.attributes['im:id']}
                    title={album['im:name'].label}
                    cover={album['im:image'][2].label}
                    artist={album['im:artist'].label}
                    link={album.id.label}
                    price={album['im:price'].label}
                    releasedate={album['im:releaseDate'].attributes.label}
                    loaderStatus={this.state.loaderVisible}
                />;
            });
        }

        return (
            <div className="container">
                {loader}
                <ScrollTop scrollStepInPx="50" delayInMs="0"/>
                <div className={styles.SiteLogo}></div>
                <h1 className={styles.MainTitle}>Top 100 USA albums on iTunes</h1>
                <Search
                    changed={this.handleInputChange}
                    searchcancel={this.handleSearchCancel}
                    inputValue={this.state.inputValue}
                />
                <div className={styles.Filters}/>
                <section className={styles.Albums}>
                    <div className="row">
                        {albums}
                    </div>
                </section>
                <div className={styles.HeartWrapper}>
                    <div className={styles.FavHeartText}>Made with</div>
                    <div className={styles.FavHeart}></div>
                </div>
            </div>
        );
    }
}

export default Albums;