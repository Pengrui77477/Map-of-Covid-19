import { defineStore } from 'pinia'
import { getApiList } from '../server/index'
import type { Children,ChinaAdd,ChinaTotal} from './type';

export const useStore = defineStore({
  id: 'counter',
  state: () => ({
    item: <Children[]>[],
    cityDetail:<Children[]>[],
    areaTree:<Children[]>[],
    chineAdd:<ChinaAdd>{},
    chinaTotal:<ChinaTotal>{},
    newDate:''
  }),
  actions: {
    async getList() {
      const result = await getApiList();
      const data = result.data.diseaseh5Shelf;
      
      this.chineAdd = data.chinaAdd;
      this.chinaTotal = data.chinaTotal;
      this.areaTree = data.areaTree[0].children;
      this.cityDetail =this.areaTree.filter((value: { total: { nowConfirm: number; }; }) =>{
        return value.total.nowConfirm > 150
      })
      this.newDate = data.lastUpdateTime;
    }
  }
})
