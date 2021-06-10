import React from 'react';
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { getFilmDetailsFromApi, getImageFromApi } from '../api/TMDBapi';

class FilmDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            film: undefined,
            isLoading: true,
        }
    }

    componentDidMount() {
        // console.log("component monté");
        getFilmDetailsFromApi(this.props.route.params.filmId)
            .then(data => {
                this.setState({
                    film: data,
                    isLoading: false,
                });
            });
    }

    componentDidUpdate() {
        // console.log("Component did update");
        // console.log(this.props.favoriteFilms);
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return(
                <View style={styles.loading}>
                    <ActivityIndicator size='large' />
                </View>
            );       
        }
    }

    _displayFavoriteImage() {
        var sourceImg = require('../images/ic_favorite.png');
        if (this.props.favoriteFilms.findIndex(item => item.id === this.state.film.id) !== -1) {
            sourceImg = require('../images/ic_favorite_border.png');
        }
        return(
            <Image style={styles.favorite_image} source={sourceImg} />
        );
    }

    _toggleFavorite() {
        const action = {type: 'TOGGLE_FAVORITE', value: this.state.film};
        this.props.dispatch(action);
    }

    _displayFilmDetails() {
        if (this.state.film != undefined) {
            return(
                <ScrollView style={styles.scrollview_container}>
                    <Image 
                        style={styles.image}
                        source={{uri: getImageFromApi(this.state.film.backdrop_path)}} />
                    <View style={styles.title_container}>
                        <Text style={styles.title_text}>{this.state.film.title}</Text>
                        <TouchableOpacity
                            style={styles.favorite_container}
                            onPress={() => this._toggleFavorite()}>
                            {this._displayFavoriteImage()}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text}>{this.state.film.overview}</Text>
                    </View>
                    <Text style={styles.info_text}>Realese date: {this.state.film.release_date}</Text>
                    <Text style={styles.info_text}>Vote average: {this.state.film.vote_average}/10</Text>
                    <Text style={styles.info_text}>Votes count: {this.state.film.vote_count}</Text>
                    <Text style={styles.info_text}>Budget: {this.state.film.budget} $</Text>
                    <Text style={styles.info_text}>
                        Genre(s): {
                            this.state.film.genres.map(genre => {
                                return genre.name;
                            }).join(" / ")
                        }
                    </Text>
                    <Text style={styles.info_text}>
                        Production companie(s): {
                            this.state.film.production_companies.map(pc => {
                                return pc.name;
                            }).join(" / ")
                        }
                    </Text>
                </ScrollView>
            );
        }
    }

    render() {
        // console.log(this.props);
        return(
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilmDetails()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 5,
        marginBottom: 40,
        marginHorizontal: 5,
        // backgroundColor: 'grey',
    },
    input: {
        height: 40,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollview_container: {
        flex: 1,
    },
    image: {
        height: 190,
        backgroundColor: 'gray',
    },
    title_container: {
        marginTop: 10,
    },
    title_text: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold',
    },
    description_container: {
        marginTop: 10,
        marginBottom: 10,
    },
    description_text: {
        color: '#666666',
        fontStyle: 'italic',
        fontSize: 16,
    },
    info_text: {
        fontSize: 16,
        paddingVertical: 2,
    },
    favorite_container: {
        alignItems: 'center',
    },
    favorite_image: {
        height: 40,
        width: 40,
        marginTop: 5,
    }
});

const mapStateToProps = (state) => {
    return {
        favoriteFilms: state.favoriteFilms
    };
}

export default connect(mapStateToProps)(FilmDetail);