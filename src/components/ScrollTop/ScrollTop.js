import React, { Component } from 'react';
import styles from './ScrollTop.module.scss';

class ScrollTop extends Component {
    state = {
        intervalId: 0,
        thePosition: false
    };

    componentDidMount() {
        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                this.setState({ thePosition: true })
            } else {
                this.setState({ thePosition: false })
            }
        });
        window.scrollTo(0, 0);
    }

    onScrollStep = () => {
        if (window.pageYOffset === 0){
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }

    scrollToTop = () => {
        let intervalId = setInterval(this.onScrollStep, this.props.delayInMs);
        this.setState({ intervalId: intervalId });
    }

    render() {
        let scrollToTopButton = null;
        if (this.state.thePosition){
            scrollToTopButton = <div className={styles.GoTop} onClick={this.scrollToTop}></div>;
        }
        return scrollToTopButton;
    }
}

export default ScrollTop;