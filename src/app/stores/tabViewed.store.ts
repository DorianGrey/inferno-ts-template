import {observable} from "mobx";

export interface TabViewedStoreProps {
  tabViewedStore: {
    lazyTest: number;
  };
}

export let tabViewedStore = observable({
  lazyTest: 0
});