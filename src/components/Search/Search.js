import React from 'react'
import styles from './Search.module.scss';

const search = (props) => (
    <div className="col-sm-12 text-center">
        <form>
            <div className={styles.FormField}>
                <span className={styles.InputIcon}></span>
                <input
                    value={props.inputValue}
                    className={styles.SearchInput}
                    placeholder="Search for artist or album..."
                    onChange={props.changed}
                />
                <span className={styles.InputCancel} onClick={props.searchcancel}></span>
            </div>

        </form>
    </div>
)

export default search