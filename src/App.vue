<template>
  <div class="box">
    <div class="box-left">
      <div class="box-left-card">
        <section>
          <div>本土现有确诊</div>
          <div>{{ store.chinaTotal.localConfirm }}</div>
          <div>较上日+ {{ store.chineAdd.localConfirmH5 }}</div>
        </section>
        <section>
          <div>现有确诊</div>

          <div>{{ store.chinaTotal.nowConfirm }}</div>
          <div>较上日+ {{ store.chineAdd.nowConfirm }}</div>
        </section>
        <section>
          <div>累计确诊</div>

          <div>{{ store.chinaTotal.confirm }}</div>
          <div>较上日+ {{ store.chineAdd.confirm }}</div>
        </section>
        <section>
          <div>无症状感染者</div>

          <div>{{ store.chinaTotal.noInfect }}</div>
          <div>较上日+ {{ store.chineAdd.noInfect }}</div>
        </section>
        <section>
          <div>境外输入</div>

          <div>{{ store.chinaTotal.importedCase }}</div>
          <div>较上日+ {{ store.chineAdd.importedCase }}</div>
        </section>
        <section>
          <div>累计死亡</div>

          <div>{{ store.chinaTotal.dead }}</div>
          <div>较上日+ {{ store.chineAdd.dead }}</div>
        </section>
      </div>
      <div class="box-left-discount"></div>
      <div class="box-left-pie"></div>
      <div class="date">截至日期：{{ store.newDate }}</div>
    </div>

    <div class="box-center">

    </div>

    <div class="box-right">
      <table class="table" cellspacing="0" border="1">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>累计治愈</th>
            <th>累计死亡</th>
          </tr>
        </thead>
        <tbody>
          <!-- <transition-group enter-active-class="animate__animated animate__pulse" tag="tbody"> -->
          <tr :key="item.name" v-for="item in store.item">
            <td align="center">{{ item.name }}</td>
            <td align="center">{{ item.today.confirm }}</td>
            <td align="center">{{ item.total.confirm }}</td>
            <td align="center">{{ item.total.heal }}</td>
            <td align="center">{{ item.total.dead }}</td>
          </tr>
          <!-- </transition-group> -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useStore } from './stores'
import { onMounted,onBeforeUpdate } from 'vue';
import * as echarts from 'echarts';
import './assets/china.js'
import { geoCoordMap } from './assets/geoMap'
// import 'animate.css'


const store = useStore();

onMounted(async () => {
  await store.getList();
  initCharts();
  initPie();
  initDiscount();
})

onBeforeUpdate(()=>{
  updataDiscount();
  updataPie();
})

const initCharts = () => {
  // console.log('+++>',store.areaTree.children);

  const city = store.areaTree;
  store.item = store.cityDetail[2].children
  const data = city.map(v => {
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm),
      children: v.children
    }
  })
  const charts = echarts.init(document.querySelector('.box-center') as HTMLElement)
  charts.setOption({
    // backgroundColor: "black",
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "120%",
      itemStyle: {
        // normal: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
        // },

      },
      emphasis: {
        areaColor: "#0f5d9d",
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            // normal: {
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
            // },
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        // selectedMode: "multiple",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "120%",
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,

        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: [45, 45],
        symbol: 'pin',
        label: {
          show: true,
          color: 'black',
          formatter(value: any) {
            return value.data.value[2]
          }
        },
        itemStyle: {
          color: 'skyblue', //标志颜色
        },
        data: data,
      },
    ],
  })
  charts.on('click', (e: any) => {
    store.item = e.data.children
  })
}

const initPie = () => {
  const pie = echarts.init(document.querySelector('.box-left-pie') as HTMLElement)
  pie.setOption({
    color: ['#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3', '#8378ea'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    toolbox: {
      show: true,
    },
    legend: {
      x: '80%', //水平位置，【left\center\right\数字】
      y: '350', //垂直位置，【top\center\bottom\数字】
      align: 'left', //字在图例的左边或右边【left/right】
      orient: 'vertical', //图例方向【horizontal/vertical】
      icon: 'circle', //图例形状【circle\rect\roundRect\triangle\diamond\pin\arrow\none】
      textStyle: {
        color: '#8C8C8C',
      },
      // height:150
    },
    series: [
      {
        name: '当前确诊数量',
        type: 'pie',
        radius: [0, 150],

        data: store.item.map(value => {
          return {
            value: value.total.nowConfirm,
            name: value.name
          }
        }).splice(2)
      },
    ],
  })

}

const initDiscount = () => {
  const discount = echarts.init(document.querySelector(".box-left-discount") as HTMLElement);
  console.log(discount);
  
  discount.setOption({
    // title: {
    //   text: 'Stacked Line'
    // },
    tooltip: {
      trigger: 'axis'
    },
    // legend: {
    //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    // },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: (store.item.filter(x => x.total.nowConfirm !==0)).map(value => value.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '当前确诊',
        type: 'line',
        stack: 'Total',
        data: (store.item.filter(x => x.total.nowConfirm !==0)).map(value => value.total.nowConfirm)
      }
    ]
  })
}


const updataDiscount = ()=>{
  const discount = echarts.getInstanceByDom(document.querySelector(".box-left-discount") as HTMLElement);
  discount?.setOption({
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: (store.item.filter(x => x.total.nowConfirm > 0)).map(value => value.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '当前确诊',
        type: 'line',
        stack: 'Total',
        data: (store.item.filter(x => x.total.nowConfirm > 0)).map(value => value.total.nowConfirm)
      }
    ]
  })
   
}

const updataPie =() =>{
  const pie = echarts.getInstanceByDom((document.querySelector('.box-left-pie') as HTMLElement));
  pie?.setOption({
    color: ['#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3', '#8378ea'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    toolbox: {
      show: true,
    },
    legend: {
      x: '80%', //水平位置，【left\center\right\数字】
      y: '350', //垂直位置，【top\center\bottom\数字】
      align: 'left', //字在图例的左边或右边【left/right】
      orient: 'vertical', //图例方向【horizontal/vertical】
      icon: 'circle', //图例形状【circle\rect\roundRect\triangle\diamond\pin\arrow\none】
      textStyle: {
        color: '#8C8C8C',
      },
      // height:150
    },
    series: [
      {
        name: '当前确诊数量',
        type: 'pie',
        radius: [0, 150],

        data: (store.item.filter(x => x.total.nowConfirm > 0)).map(value => {
          return {
            value: value.total.nowConfirm,
            name: value.name
          }
        }).splice(2)
      },
    ],
  })
}
</script>

<style lang='less'>
* {
  padding: 0;
  margin: 0;
}

@itemColor: #2f3cc3;
@itemBg: #8aa9d1;
@itemBorder: #4c495a;

html,
body,
#app {
  height: 100%;
  // overflow: hidden;
}

.box {
  height: 100%;
  display: flex;
  // overflow: hidden;
  // background: url('../public/veer-309133675.webp');
  background-size: 100% 100%;

  &-left {
    width: 400px;
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
    align-items: center;

    &-card {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto;

      section {
        background-color: @itemBg;
        border: 1px solid @itemBorder;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        div:nth-child(2) {
          color: @itemColor;
          padding: 10px 0;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }

    &-pie {
      width: 100%;
      height: 350px;
      margin-top: 20px;
    }

    &-discount {
      width: 100%;
      height: 300px;
    }
  }

  &-center {
    flex: 1
  }

  &-right {
    width: 400px;
    // background-color: rgb(205, 255, 228);
  }
}

.table {
  width: 100%;

  // margin-right: 13px;
  // background-color: #212028;
  tr {
    th {
      // padding: 5px;
      white-space: nowrap;
    }

    td {
      // padding: 5px 10px;
      width: 100px;
      white-space: nowrap;
    }
  }

}
</style>