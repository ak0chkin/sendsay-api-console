import {makeAutoObservable, runInAction} from 'mobx';
import Sendsay from "sendsay-api";

const SENDSAY_SESSION = 'SENDSAY_SESSION';
const sendsay = new Sendsay();

class SendsayStore {
    session = undefined;
    account = undefined;
    sublogin = undefined;
    input = undefined;
    output = undefined;

    constructor() {
        makeAutoObservable(this);
        this.session = localStorage.getItem(SENDSAY_SESSION);
        if (this.session) {
            (async () => {
                try {
                    const response = await sendsay.request({action: "pong", session: this.session});
                    runInAction(() => {
                        this.account = response.account;
                        this.sublogin = response.sublogin;
                    });
                }
                catch (error)
                {
                    if (error.explain === "expired") {
                        this.logout();
                    }
                }
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
            return undefined;

        } catch (error) {
            return JSON.stringify({id: error.id, explain: error.explain});
        }
    }

    logout = () => {
        this.session = undefined;
        localStorage.removeItem(SENDSAY_SESSION);
        this.account = undefined;
        this.sublogin = undefined;
        this.input = undefined;
        this.output = undefined;
    }

    change = (value) => {
        this.input = value;
    }

    prettify = () => {
        try {
            this.input = JSON.stringify(JSON.parse(this.input), null, 2);
        }
        catch (error) {

        }

    }

    fetch = async () => {
        try {
            const response = await sendsay.request({...JSON.parse(this.input), session: this.session});
            runInAction(() => {
                this.output = JSON.stringify(response, null, 2);
            });
        }
        catch (error) {
            runInAction(() => {
                this.output = error.toString();
            });
        }
    }
}

export default new SendsayStore();
