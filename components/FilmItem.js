import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getImageFromApi } from '../api/TMDBapi';

export default class FilmItem extends React.Component {

    _displayFavoriteImage() {
        if (this.props.isFilmFavorite) {
            sourceImg = require('../images/ic_favorite_border.png');
            return(
                <Image style={styles.favorite_image} source={sourceImg} />
            );
        }
    }

    render() {
        const {film, displayDetailsForFilm} = this.props;
        return(
            <TouchableOpacity style={styles.main_container} onPress={() => displayDetailsForFilm(film.id)}>
                <Image style={styles.image} 
                    source={{uri: getImageFromApi(film.poster_path)}} />
                <View style={styles.info_container}>
                    <View style={styles.header_container}>
                        {this._displayFavoriteImage()}
                        <Text style={styles.title_text}>{film.title}</Text>
                        <Text style={styles.vote_text}>{film.vote_average}</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 200,
        flexDirection: 'row',
        marginBottom: 5,
    },
    image: {
        height: 200,
        width: 120,
        backgroundColor: 'gray',
    },
    info_container: {
        flex: 1,
        padding: 5,
        // backgroundColor: '#E7D5D2',
    },
    header_container: {
        flex: 3,
        flexDirection: 'row',
    },
    title_text: {
        flex: 1,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        fontSize: 20,
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666',
    },
    description_container: {
        flex: 7,
    },
    description_text: {
        fontSize: 15,
        fontStyle: 'italic',
        color: '#666666',
    },
    date_container: {
        flex: 1,
    },
    date_text: {
        textAlign: 'right',
    },
    favorite_image: {
        height: 25,
        width: 25,
        marginRight: 5,
    }
});