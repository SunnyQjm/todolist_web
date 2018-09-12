const initState = {
    data: [],
};
const HomeReducer = (state = initState, action) => {
    let newState = {};
    Object.assign(newState, state);
    switch (action.type){

    }
    return newState;
};

export default HomeReducer