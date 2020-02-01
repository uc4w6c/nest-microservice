# Redisの勉強
dockerでredisコンテナに入る(docker exec -it nestjs-microservice-test-redis bash)

## CLI
### 参考
https://qiita.com/rubytomato@github/items/d66d932959d596876ab5#set--setnx--get

### redisへ接続
$ redis-cli

### 存在する全てのキーを取得する
$ keys *
  *はパターンマッチなので、keys keyhog[a-z]みたいなものでもOK

### キーを取得
$ get keyhoge

### キーに値をセット
$ set keyhoge hogehoge

## subscribeする
$ subscribe "{\"cmd\":\"sum\"}_ack"
ダブルウォートは\でエスケープしないとsubscribeできない
