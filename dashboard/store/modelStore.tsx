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

    autorun(() => {
      if (true) {
        this.getModels();
      }
    });
  }

  setModels = (models: any) => {
    this.models = models;
  };

  getModels = async () => {
    const models = await getAllModels();
    this.setModels(toJS(models));
  };
}

const userStore = new UserStore();
export default userStore;
