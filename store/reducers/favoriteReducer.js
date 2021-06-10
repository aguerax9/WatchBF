
const initialState = {favoriteFilms: []};

function toggleFavorite(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmId = state.favoriteFilms.findIndex(item => item.id === action.value.id);
            if (favoriteFilmId !== -1) {
                nextState = {
                    ...state,
                    favoriteFilms: state.favoriteFilms.filter((item, index) => index !== favoriteFilmId)
                };
                // console.log("deleting film from fav");
            } else {
                nextState = {
                    ...state,
                    favoriteFilms: [...state.favoriteFilms, action.value]
                };
                // console.log("adding film from fav");
            }
            return nextState || state;
        default:
            return state;
    }
}

export default toggleFavorite;