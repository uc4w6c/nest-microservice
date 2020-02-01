## 参考
https://qiita.com/TsuyoshiUshio@github/items/c990137a690ac0ae6894

## コンテナに入る
docker exec -it nestjs-microservice-test-kafka bash
## 作業ディレクトリ
$ cd /usr/bin

## トピックの作成
$ ./kafka-topics --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 1 --topic test

## 送信
$ ./kafka-console-producer --broker-list localhost:29092 --topic test

## 受信
$ kafka-console-consumer --bootstrap-server localhost:29092 --topic test --from-beginning
