const genres = [
    {
        id: 28,
        name: "Action",
        isChecked: false,
    },
    {
        id: 12,
        name: "Adventure",
        isChecked: false,
    },
    {
        id: 16,
        name: "Animation",
        isChecked: false,
    },
    {
        id: 35,
        name: "Comedy",
        isChecked: false,
    },
    {
        id: 80,
        name: "Crime",
        isChecked: false,
    },
    {
        id: 99,
        name: "Documentary",
        isChecked: false,
    },
    {
        id: 18,
        name: "Drama",
        isChecked: false,
    },
    {
        id: 10751,
        name: "Family",
        isChecked: false,
    },
    {
        id: 14,
        name: "Fantasy",
        isChecked: false,
    },
    {
        id: 36,
        name: "History",
        isChecked: false,
    },
    {
        id: 27,
        name: "Horror",
        isChecked: false,
    },
    {
        id: 10402,
        name: "Music",
        isChecked: false,
    },
    {
        id: 9648,
        name: "Mystery",
        isChecked: false,
    },
    {
        id: 10749,
        name: "Romance",
        isChecked: false,
    },
    {
        id: 878,
        name: "Science Fiction",
        isChecked: false,
    },
    {
        id: 10770,
        name: "TV Movie",
        isChecked: false,
    },
    {
        id: 53,
        name: "Thriller",
        isChecked: false,
    },
    {
        id: 10752,
        name: "War",
        isChecked: false,
    },
    {
        id: 37,
        name: "Western",
        isChecked: false,
    },
];

const handleChangeFilters = (genreId) => {
    const updatedGenreIndex = genres.findIndex((genre) => {
        return genre.id === genreId;
    });

    const updatedGenre = genres.find((genre) => {
        return genre.id === genreId;
    });

    const newGenres = [...genres];

    newGenres.splice(updatedGenreIndex, 1, {
        ...updatedGenre,
        isChecked: !updatedGenre.isChecked,
    });

    // const genreToChange = newGenres.splice(updatedGenreIndex, 1);

    // genreToChange[0].isChecked = !genreToChange[0].isChecked;

    // newGenres.push(...genreToChange);

    console.log(newGenres);
};

handleChangeFilters(28);
