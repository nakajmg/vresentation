## :fist_oncoming: 目的とモチベ

- Performance系APIを知る
- APIで取得できるデータを蓄積&可視化してみる
- React使ってみる
- MobX使ってみる

## :wrench: Performance系API

:point_up: iOS 11でSafariが各種APIに対応して全ブラウザでalmost readyな状況
:point_up_2:  [PerformanceObserver](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)に対応してれば変更がある度に自動でデータ送信できる
:point_up_2:  [JSからリソースのサイズが取れるようになる](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/transferSize)（将来的に）

##  :chart_with_upwards_trend: [Navigation Timing API](http://caniuse.com/#feat=nav-timing)
- ページ表示にかかる時間の詳細

![image.png (158.9 kB)](https://img.esa.io/uploads/production/attachments/1700/2017/10/17/4496/1e3ceb12-e710-43a4-a29e-8560000882fa.png)

## :chart_with_upwards_trend: [User Timing API](http://caniuse.com/#feat=user-timing)
- マイクロ秒の性能計測用
- `mark()` と `measure()`

![image.png (165.4 kB)](https://img.esa.io/uploads/production/attachments/1700/2017/10/17/4496/b7b066d0-a493-4526-9eca-8900653f889e.png)

## :chart_with_upwards_trend: [Resource Timing](http://caniuse.com/#feat=resource-timing)
- リソース読み込みにかかる時間の詳細

![image.png (159.6 kB)](https://img.esa.io/uploads/production/attachments/1700/2017/10/17/4496/49c5bb61-5c22-44c6-886b-f6e1b6d80d4b.png)

## :muscle:
これらのAPIで取得できるデータを蓄積＆可視化するものを作る

## :robot: Sentinel
![image.png (305.0 kB)](https://img.esa.io/uploads/production/attachments/1700/2017/10/17/4496/f8539251-505a-4cf4-add6-66b59410515d.png)

https://github.com/nakajmg/sentinel/

## :robot: Sentinel
- データを送信する用のライブラリ
- データを蓄積するサーバ
- 蓄積したデータを可視化するアプリ


## :robot: Sentinel
![image.png (174.3 kB)](https://img.esa.io/uploads/production/attachments/1700/2017/10/17/4496/0bd1661b-8bb9-43ba-ae22-592bd78295d3.png)
※ 蓄積したデータのリスト


## :robot:  Sentinel
![image.png (163.9 kB)](https://img.esa.io/uploads/production/attachments/1700/2017/10/17/4496/661ce9f5-76f9-4044-914e-0728563075fc.png)
※ Navigation Timingをグラフに



## :robot:  Sentinel
![image.png (198.8 kB)](https://img.esa.io/uploads/production/attachments/1700/2017/10/17/4496/f7c3fa2a-4863-46cb-82de-63eba58c9604.png)
※ Resource Timingをグラフに

## :gear: 使ったやつ
- React
- MobX with react-mobx
- path-match
- ua-parser-js
- JSON Server

## :no_good_woman: 試したけどボツにしたやつ1
- Highcharts
    - 絶妙に用途にマッチしなかった
    - ちょっとダサい
    - でも便利そうな印象

## :no_good_woman: 試したけどボツにしたやつ2
- Material UI
  - 簡単にイケてるUIにできるかと思ったけど手間が増えるだけだった
  - ドキュメント結構読む必要あってしんどい
  - カスタマイズしづらい

## :hotsprings:
最終的にグラフも含め温もりのある手書きCSSにした

## :muscle: 合宿の成果
- React + MobXの習得（★★★☆☆）
- Performance系APIの役割と使い方の習得（★★★★☆）
- [データ送信用のクライアントライブラリ](https://github.com/nakajmg/sentinel/blob/a8ea3a6359fdd908268d8cd45af2e3b16a9f86ea/src/Sentinel.js)作った
- [Navigation Timingのグラフ](https://img.esa.io/uploads/production/attachments/1700/2017/10/17/4496/5703a39c-7d7b-4018-892f-fe6c3154aea1.png)作った
- [vue-routerぽいrouterをスクラッチ](https://github.com/nakajmg/sentinel/tree/a8ea3a6359fdd908268d8cd45af2e3b16a9f86ea/src/router)した
- CSSのgridでレイアウトできるようになった（★★☆☆☆）
- ESDocでドキュメント作成した



