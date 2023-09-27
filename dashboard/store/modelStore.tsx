import { observable, action, makeObservable, toJS, autorun } from "mobx";
import { getAllModels } from "../services/modelServices";

class UserStore {
  models = [];

  constructor() {
    makeObservable(this, {
      models: observable,
      setModels: action,
      getModels: action,
    });

    // autorun(() => {
    //   if (true) {
    //   }
    // });
  }

  setModels = (models: any) => {
    this.models = models;
  };

  getModels = () => {
    const models = getAllModels();
    this.setModels(toJS(models));
    return this.models;
  };
}

const userStore = new UserStore();
export default userStore;
