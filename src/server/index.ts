import axios from 'axios';

// const server = axios.create({
//     baseURL:"http://localhost:3030"
// })

export const getApiList = ()=> axios.get('https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=staticGradeCityDetail,diseaseh5Shelf').then(res => res.data)