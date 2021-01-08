import {makeAutoObservable, runInAction} from 'mobx';
import Sendsay from "sendsay-api";

const SENDSAY_SESSION = 'SENDSAY_SESSION';
const sendsay = new Sendsay();

class SendsayStore {
    session = undefined;
    account = undefined;
    sublogin = undefined;
    message = '';

    constructor() {
        makeAutoObservable(this);
        this.session = localStorage.getItem(SENDSAY_SESSION);
        if (this.session) {
            (async () => {
                const response = await sendsay.request({action: "pong", session: this.session});
                runInAction(() => {
                    this.account = response.account;
                    this.sublogin = response.sublogin;
                });
            })();
        }
    }

    login = async ({login, sublogin, password}) => {
        try {
            await sendsay.login({login, sublogin, password});
            const response = await sendsay.request({action: "pong", session: sendsay.session});
            runInAction(() => {
                this.session = sendsay.session;
                localStorage.setItem(SENDSAY_SESSION, sendsay.session);
                this.account = response.account;
                this.sublogin = response.sublogin;
            });

        } catch (error) {
            runInAction(() => {
                this.message = JSON.stringify({id: error.id, explain: error.explain});
            });
        }
    }

    logout = () => {
        this.session = undefined;
        localStorage.removeItem(SENDSAY_SESSION);
        this.account = undefined;
        this.sublogin = undefined;
    }
}

export default new SendsayStore();
