import UserStore from './UserStore';

const store = {
    useStore: new UserStore()
};

export type TStore = typeof store;

export default store;
