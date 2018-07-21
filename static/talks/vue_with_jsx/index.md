---
title: Vue with JSX
---

## VueでJSXを使う

- `<template>` ではなく `render()` で
- `babel-plugin-transform-vue-jsx` 入れるだけ

## こんなかんじ

```js
export default {
  props: {
    themes: {
      type: Array,
    },
  },
  render(h) {
    return <div class="ThemeSwitcher">
      {this.themes.map(theme => (
        <button　onClick={() => this.selectTheme(theme)}　class={`ThemeSwitcher_Button _${theme}`}/>
      ))}
    </div>
  },
  methods: {
    selectTheme(theme) {
      this.$emit('select', { theme })
    },
  },
}
```

##
::: center
### Q. Reactでよくない？
:::

## A. Vueが使いたいの
- Vueエコシステムには乗りたい
- `vue-router` や `vuex` などなど
- `.vue` ファイルのアド


## `.vue` ファイルのアド
- React + `styled-components` みたいな組み合わせを考える必要もない
- `.vue` で JSX + `<style scoped>` の書き味めちゃいい

## JSXのアド
- `<script>` と `<style>` だけの行き来で済む
- 参照する値・関数が近くていい
- `components` に登録しなくていい

## `components` に登録しなくていい
- JSXはJSだから `components` に登録しなくても使える
- `import` して `components` に書いて…とか
- 使わなくなったから `import` 消して、`components`も消して…がいらない

## `components` に登録しなくていい

```js
import Icon from './Icon'
export default {
  render(h) {
    return <div>
      <Icon/> Icon使えるよ
    </div>
  }
}
```

## ネストしたコンポーネントの描画が楽
- `props.children` の存在
- `<slot>` だるい
- scoped slotもっとだるい

## functionalの存在
- `<template functional>` ちょっときもい
- 純粋な `.js` ファイルとして作れる

##
::: center
### 一度書いてみなって
:::


```js
import {mapState, mapMutations} from 'vuex'
export default {
  computed: {
    ...mapState(['hoge', 'fuga'])
  },
  methods: {
    ...mapMutations(['setHoge', 'setFuga'])
  },
}
```

```html
<template>
  <div>
    <HogeComponent :hoge="hoge" />
    <FugaComponent :fuga="fuga" />
  </div>
</template>
```


```js
import React, { Component } from 'react'

const HogeComponent = props => {
  const {hoge} = this.props
  return (
    <div>
      {hoge}
    </div>
  )
}

function mapStateToProps(state) {
  return  { hoge: state.hoge };
}
export default connect(mapStateToProps)(HogeComponent)
```

```js
import {connect} from 'vuex-connect'
import HogeComponent from './HogeComponent.vue'
import mutationsTypes from '../store/mutationsTypes

export default connect({
  stateToProps: {
    hoge: state => state.hoge,
  },
  mutationsToEvents: {
    updateHoge: mutationsTypes.UPDATE_HOGE
  },
})
```

