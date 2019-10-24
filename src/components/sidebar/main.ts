import Vue from "vue";
import { animate } from "@/common/utils";
export default Vue.extend({
  name: "Sidebar",
  props: {
    distance: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    direction: {
      type: String,
      required: true
    },
    easing: {
      type: String,
      default: "linear"
    },
    isPc: {
      type: Boolean,
      required: true
    },
    buttons: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isShowContent: false
    };
  },
  methods: {
    toggleContent() {
      if (this.isShowContent) {
        this.move("0rem");
      } else {
        this.move(this.$props.distance);
      }
    },
    move: function (distance: string) {
      animate(this.$refs.navBox).velocity(
        {
          [this.$props.direction]: distance
        },
        {
          duration: this.$props.duration, // 动画执行时间
          easing: this.$props.easing,
          complete: () => {
            const isShowContent = this.isShowContent;
            this.isShowContent = !isShowContent;
          }
        }
      );
    }
  }
});