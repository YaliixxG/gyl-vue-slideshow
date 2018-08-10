<template>
   <div class="vue-slideshow-wrap"  :style="wrapStyle">
    <ul class="vue-slideshow-list" @touchstart="slideStart" v-if="isMobile">
      <li :class="'p'+ (index+1)" v-for="(item,index) in imgArr" :key="item.index"><img :src="item" alt=""></li>
    </ul>
    <ul class="vue-slideshow-list" @mousedown="slideStart" v-if="!isMobile">
      <li :class="'p'+ (index+1)" v-for="(item,index) in imgArr" :key="item.index"><img :src="item" alt=""></li>
    </ul> 
    </div> 
</template>

<script>
export default {
  props: {
    imgArr: {
      //图片地址参数数组
      type: Array,
      default: _ => []
    },
    wrapWidth: {
      //包裹层宽
      type: [Number, String],
      default: 400
    },
    wrapHeight: {
      //包裹层高
      type: [Number, String],
      default: 200
    }
  },
  data() {
    return {
      x1: "", //按下的坐标
      x2: "", //移动的坐标
      changeX: "",
      pArr: []
    };
  },
  computed: {
    isMobile() {
      return (
        this.eventType === "touch" ||
        (this.eventType !== "mouse" &&
          /(iPhone|iPad|iPod|iOS|Android|SymbianOS|Windows Phone|Mobile)/i.test(
            navigator.userAgent
          ))
      );
    },
    wrapStyle() {
      return {
        width: this.wrapWidth + "px",
        height: this.wrapHeight + "px",
      };
    }
  },
  mounted() {
    this.$nextTick(_ => {
      this.setPArr();
    });
  },
  methods: {
    bindEvents() {
      if (this.isMobile) {
        document.addEventListener("touchmove", this.slideMove);
        document.addEventListener("touchend", this.slideEnd);
      } else {
        document
          .querySelector(".vue-slideshow-list")
          .addEventListener("mousemove", this.slideMove);
        document
          .querySelector(".vue-slideshow-list")
          .addEventListener("mouseup", this.slideEnd);
        document
          .querySelector(".vue-slideshow-list")
          .addEventListener("mouseleave", this.slideEnd);
      }
    },
    unbindEvents() {
      if (this.isMobile) {
        document.removeEventListener("touchmove", this.slideMove);
        document.removeEventListener("touchend", this.slideEnd);
      } else {
        document
          .querySelector(".vue-slideshow-list")
          .removeEventListener("mousemove", this.slideMove);
        document
          .querySelector(".vue-slideshow-list")
          .removeEventListener("mouseup", this.slideEnd);
        document
          .querySelector(".vue-slideshow-list")
          .removeEventListener("mouseleave", this.slideEnd);
      }
    },
    setPArr() {
      let liArr = document.querySelectorAll(".vue-slideshow-list li");
      liArr.forEach(element => {
        this.pArr.push(element.className);
      });
      console.log(this.pArr);
    },
    slideStart(e) {
        this.bindEvents();
      if (this.isMobile) {
        this.x1 = e.targetTouches[0].clientX;
      } else {
        this.x1 = e.clientX;
      }
    },
    slideMove(e) {
      if (this.isMobile) {
        this.x2 = e.targetTouches[0].clientX;
      } else {
        e.preventDefault(); //禁止移动端图片默认拖拽事件
        this.x2 = e.clientX;
      }
    },
    slideEnd(e) {
      this.changeX = this.x2 - this.x1;
      console.log("this.changeX", this.changeX);
      if (this.changeX < 0) {
        //往左滑
        this.pArr.unshift(this.pArr[this.pArr.length - 1]);
        this.pArr.pop();
        this.push();
      }
      if (this.changeX > 0) {
        //往右滑
        this.pArr.push(this.pArr[0]);
        this.pArr.shift();
        this.push();
      }
      this.unbindEvents();
    },
    push() {
      let li = document.querySelectorAll(".vue-slideshow-list li");
      for (let i = 0; i < li.length; i++) {
        li[i].setAttribute("class", "");
        li[i].setAttribute("class", this.pArr[i]);
      }
    }
  }
};
</script>

<style scoped>
.vue-slideshow-list {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  position: relative;
}
.vue-slideshow-list li {
  margin: 0;
  width: calc(100% / 3);
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.3s ease-out;
}
.vue-slideshow-list li img {
  width: 100%;
  height: 100%;
}
.p1 {
  transform: translate3d(50%, 0, 0) scale(0.8);
  opacity: 0.8;
  z-index: 1;
  transform-origin: 0 50%;
}
.p2 {
  transform: translate3d(100%, 0, 0) scale(1);
  opacity: 1;
  z-index: 2;
  transform-origin: 0 50%;
}
.p3 {
  transform: translate3d(170%, 0, 0) scale(0.8);
  opacity: 0.8;
  z-index: 1;
  transform-origin: 0 50%;
}
</style>
