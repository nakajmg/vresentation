## こんなUIを作る

![image.png (32.8 kB)](https://img.esa.io/uploads/production/attachments/1700/2018/06/12/4496/b6b161cf-1bac-4045-aa5c-a0440cc80df0.png)


## こんなUIを作る

![image.png (450.9 kB)](https://img.esa.io/uploads/production/attachments/1700/2018/06/12/4496/c715dbe0-fb27-49af-ac5d-6fbc44674f72.png)


## 日付の情報をどんな形式で保持するか
date-fnsで日時操作して対象月の日付を `Date` で取得したあと

- Dateのまま
- 文字列で `2018-06-12T13:50+9:00` (ISO 8601)
- オブジェクトにして `{year, month, date, day, hours, minutes, seconds}`
- オブジェクトにして `{year, month, date, day, hours, minutes, seconds}`
- オブジェクトにして `{year, month, date, day, hours, minutes, seconds}`
- オブジェクトにして `{year, month, date, day, hours, minutes, seconds}`

## ISO 8601
- 日付と時刻の表記に関する国際規格
- yyyy-MM-ddTHH:mm:ss
- 日本標準時(JST) `2018-06-12T13:50:40+09:00`
- 協定世界時(UTC) `2018-06-12T04:50:40Z`
- ChromeでもIE11でも `new Date` の結果は一緒

## サーバサイドではISO 8601のフォーマット一択か
- タイムゾーンに考慮しつつ
    - 日本だけから使うなら `+9:00` 決め打ちでもいい？
    - UTC (`Z` )で持ってると生データ見たとき脳内カレンダーと脳内時計がバグる

## クライアントサイドでどうする

## Dateのまま
- 都度 `getYear()` `getMonth()` `getDate()` とか実行しないと
- 日時の計算をするならこれ
    - date-fnsとかで

## 文字列で
- 都度 `new Date()` が必要
- 曜日の情報が見えない
- でも受け渡しは楽

## オブジェクトにして
- レンダリングするのが楽
- 文字列で受け取った日時の情報
    - `new Date` して `getDate` とかで作る必要あり
- 日付操作したい場合 `new Date(year, month, date)` しまくる必要あり

## どうしたか
- オブジェクトに整形して使った

## どうなったか
- `new Date(year, month, date)` して使う機会が多かった
    - 日付操作のたびにめんどくさい
- `Date` -> `Object` -> `Date` と変換によるオーバーヘッドが気になる
- propsで渡すとき `Date` で渡すのに比べて渡すプロパティ増えすぎぃ


## どうすればよかった？
クライアントサイドでは `Date` のまま取り回す方がよさそう


## タイムゾーン
- 実行環境で変わる
    - CIとか変な時間になってテストこける
- `Date` はタイムゾーンsetできない
- date-fnsもタイムゾーン操作できない
    - moment
    - Luxon
    - date-with-offset

## 次やるなら
- Luxon使う（未検証）
- アプリ内では `Date` でやりとりする
