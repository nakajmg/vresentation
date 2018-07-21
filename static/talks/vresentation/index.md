---
title: vresentation
author: nakajmg
location: 自宅
date: 2018/7/2
---

## markdown
hello!

## youtube埋め込み

::: video

<iframe width="100%" height="100%" src="https://www.youtube.com/embed/XHAAcfCrJNs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

:::

## mp4

::: video /static/talks/vresentation/video.mp4

:::

## 画像の横にテキスト(左)

::: left
![image.png (450.9 kB)](https://img.esa.io/uploads/production/attachments/1700/2018/06/12/4496/c715dbe0-fb27-49af-ac5d-6fbc44674f72.png)

- 画像のよこにテキスト置きたい
- そのあとのテキストは？
:::

## 画像の横にテキスト(右)

::: right
![image.png (450.9 kB)](https://img.esa.io/uploads/production/attachments/1700/2018/06/12/4496/c715dbe0-fb27-49af-ac5d-6fbc44674f72.png)

画像のよこにテキスト置きたい

そのあとのテキストは？
:::

##

::: bg https://img.esa.io/uploads/production/attachments/1700/2018/06/12/4496/c715dbe0-fb27-49af-ac5d-6fbc44674f72.png

:::

### 背景画像

- ほげ
- ふが

##
::: bg https://img.esa.io/uploads/production/attachments/1700/2018/06/12/4496/c715dbe0-fb27-49af-ac5d-6fbc44674f72.png

:::

::: center
### 背景 with center
:::

##

::: cover https://img.esa.io/uploads/production/attachments/1700/2018/06/12/4496/c715dbe0-fb27-49af-ac5d-6fbc44674f72.png

:::

## コードブロック

```js
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
## リスト
- hoge
- hoge
- hoge


## リンク
https://github.com/tsayen/dom-to-image/issues/226

##

::: center
### カスタムブロックで真ん中に
:::

## code
- yyyy-MM-ddTHH:mm:ss
- 日本標準時(JST) `2018-06-12T13:50:40+09:00`
- 協定世界時(UTC) `2018-06-12T04:50:40Z`
- ChromeでもIE11でも `new Date` の結果は一緒
