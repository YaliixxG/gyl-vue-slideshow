# gyl-vue-slideshow
## 一款Vue的3D轮播图插件  

#### 安装  
npm i gyl-vue-slideshow  

#### 参数  
imgArr：[] （图片地址参数数组）  
wrapWidth:400 （容器宽）  
wrapHeight:200 （容器高） 

###### 注意：  
1. 容器宽的最合适尺寸是图片宽的三倍。
2. 图片的引入需使用绝对路径，或者用import来引入本地图片。
3. 本轮播暂时只支持三张轮播。

#### 应用  

    <Slideshow v-bind="setData"></Slideshow>  
    
    import a from './assets/m1.png';
    import b from './assets/m2.png';
    import c from './assets/m3.png';  
    
    export default {
      name: 'app',
      data () {
        return {
          setData:{
           imgArr:[
           a,b,c
           ]
          }
        }
      }
    }

