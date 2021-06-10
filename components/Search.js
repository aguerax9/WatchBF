import React from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';

import FilmItem from './FilmItem';

import { getFilmFromApi } from '../api/TMDBapi';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.searchedText = "";
        this.page = 0;
        this.totalPages = 0;
        this.state = {
            films: [],
            isLoading: false,
        };
    }

    _textInputChanged(text) {
        this.searchedText = text;
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

    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({
                isLoading: true,
            });
            getFilmFromApi(this.searchedText, this.page+1).then(data => {
                this.page = data.page;
                this.totalPages = data.total_pages;
                this.setState({
                    films: [...this.state.films, ...data.results],
                    isLoading: false,
                });
            });   
        }
    }

    _searchFilms() {
        this.page = 0;
        this.totalPages = 0;
        this.setState({
            films: [],
        }, () => {
            // console.log("page: "+this.page+" / pages totales: "+this.totalPages+" / nbre de films: "+this.state.films.length);
            this._loadFilms();
        });
    }

    _displayDetailsForFilm = (filmId) => {
        // console.log("Display details for film id: "+filmId);
        this.props.navigation.navigate("Infos", {filmId: filmId});
    }

    render() {
        // console.log(this.props);
        return(
            <View style={styles.main_container}>
                <TextInput style={styles.input} 
                    placeholder="Titre du film"
                    onChangeText={(text) => this._textInputChanged(text)}
                    onSubmitEditing={() => this._searchFilms()} />
                <Button title="Rechercher" onPress={() => this._searchFilms()} />
                <FlatList 
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem 
                        film={item} 
                        displayDetailsForFilm={this._displayDetailsForFilm} 
                        isFilmFavorite={(this.props.favoriteFilms.findIndex(film => film.id === item.id) !== -1)? true : false} />}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) {
                            this._loadFilms();
                        }
                    }}
                />
                {this._displayLoading()}
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
        top: 100,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const mapStateToProps = (state) => {
    return {
        favoriteFilms: state.favoriteFilms
    };
}

export default connect(mapStateToProps)(Search);