<!-- keyboard-box.vue-->
<template>
    <div class="keyboard-box">
      <div :class="keyboardClass"></div>
    </div>
  </template>
  
  <script setup name= "SimpleKeyboard">
  //引用
  import Keyboard from "simple-keyboard";
  import "simple-keyboard/build/css/index.css";
  import { onMounted, ref, watch } from "vue";
  //自定义键盘图片
//  import delIcon from "../assets/img/a.png";
 // import lockIcon from "../assets/img/a.png";
 // import bigIcon from "../assets/img/a.png";
  
  const emit = defineEmits(["onChange", "onKeyPress"]);
  const visible = ref(true);
  const props = defineProps({
    keyboardClass: { type: String, default: "simple-keyboard" },
    input: String,
    layout: {
      type: Object,
      default: () => {
        return {
          default: [
            "1 2 3 {bksp}",
            "4 5 6 .",
            "7 8 9 @",
            "{close} 0 {abc} {enter}",
          ],
          abc: [
            "q w e r t y u i o p",
            "a s d f g h j k l",
            "{lock} z x c v b n m {bksp}",
            "{123} . 0 @ {close} {enter}",
          ],
          lock: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L",
            "{big} Z X C V B N M {bksp}",
            "{123} . 0 @ {close} {enter}",
          ],
  
          // default: [
          //     "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
          //     "{tab} q w e r t y u i o p [ ] \\",
          //     "{lock} a s d f g h j k l ; ' {enter}",
          //     "{shift} z x c v b n m , . / {shift}",
          //     "@ {space}",
          //   ],
          //   shift: [
          //     "~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}",
          //     "{tab} Q W E R T Y U I O P { } |",
          //     '{lock} A S D F G H J K L : " {enter}',
          //     "{shift} Z X C V B N M &lt; &gt; ? {shift}",
          //     "@ {space}",
          //   ],
        };
      },
    },
  });
  let keyboard = ref(null);
  onMounted(() => {
    keyboard.value = new Keyboard(props.keyboardClass, {
      onChange: onChange,//这里一定要注意驼峰命名（否则会不生效）
      onKeyPress: onKeyPress,
    });
    keyboard.value.setOptions({
      layoutName: "default",
      layout: props.layout,
      display: {
        // 中文语言包
        "{enter}": "完成",
        "{123}": "123",
        "{tab}": "tab",
        "{shift}": "shift",
        "{space}": " ",
       // "{bksp}": `<img src=${delIcon} style='' width='30'>`,
       // "{big}": `<img src=${lockIcon} style='' width='30'>`,
       // "{lock}": `<img src=${bigIcon} style='' width='30'>`,
        "{close}": "关闭",
        "{abc}": "abc",
      },
    });
  });
  
  watch(()=>props.input, (newValue, oldValue) => {
    keyboard.value.setInput(newValue);
  });
  
  const onChange = (input) => {
    emit("onChange", input);
  };
  const onKeyPress = (button) => {
    emit("onKeyPress", button);
    if (button === "{123}" || button === "{abc}") {
      handleShift();
    }
    if (button === "{lock}" || button === "{big}") hadleLock();
    // return;
    if (
      button === "{big}" ||
      button === "{abc}" ||
      button === "{lock}" ||
      button === "{123}"
    ) {
      console.log(
        keyboard.value.options.layoutName,
        "keyboard.value.options.layoutName"
      );
    }
  };
  
  const handleShift = () => {
    let currentLayout = keyboard.value.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "abc" : "default";
  
    keyboard.value.setOptions({
      layoutName: shiftToggle,
    });
  };
  const hadleLock = () => {
    let currentLayout = keyboard.value.options.layoutName;
    let shiftToggle = currentLayout === "abc" ? "lock" : "abc";
  
    keyboard.value.setOptions({
      layoutName: shiftToggle,
    });
  };
  </script>
  
  <style  scoped>
  .keyboard-box{
    width: 40%;
    margin: auto;
  }
  .simple-keyboard {
    background: none !important;
    font-size: 20px;
  }
  
  ::v-deep(.hg-button:nth-of-type(4)),
  ::v-deep(.hg-button-close),
  ::v-deep(.hg-button-abc) {
    box-sizing: border-box;
    width: 20px;
    max-width: none !important;
  }
  .hg-button {
    /* width: calc(100% / 4); */
  }
  </style>
  