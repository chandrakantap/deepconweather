import React from 'react';
import clsx from 'clsx';
import { MdFavorite, MdFavoriteBorder, MdClear } from 'react-icons/md'
import IconButton from 'common/ui/IconButton';
import styles from './SingleCityInfo.module.css';


function SingleCityInfo({ city, onClickFavourite, onClickRemove }) {
    const onClickFavButton = () => {
        onClickFavourite(city);
    }
    const onClickDeleteButton = () => {
        onClickRemove(city);
    }
    return (<section className={styles.root}>
        <div>
            <h1 className={styles.cityName}>{city.name}</h1>
            <h2 className={styles.countryName}>{city.country}</h2>
        </div>
        <h2 className={styles.temperature}>{city.current.temperature} &#8451;</h2>
        <div>
            <IconButton className={styles.favouriteIcon} onClick={onClickFavButton}>
                {city.isFavourite ? <MdFavorite /> : <MdFavoriteBorder />}
            </IconButton>
        </div>
        <IconButton className={clsx(styles.deleteIcon, 'visibleOnHover')} onClick={onClickDeleteButton}>
            <MdClear />
        </IconButton>
    </section>);
}

export default SingleCityInfo;