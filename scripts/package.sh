#!/usr/bin/env bash

mvn clean package

basedir=$(pwd)

rm -r build

mkdir -p build/onteon-demo-app-cookbook/native/bin
mkdir -p build/onteon-demo-app-cookbook/native/conf
cp onteon-files/conf/native-conf.yml build/onteon-demo-app-cookbook/native/conf/conf.yml
cp target/*.war build/onteon-demo-app-cookbook/native/bin/app.war
cd build/onteon-demo-app-cookbook/native && tar -zcvf ../../onteon-demo-app-cookbook-native.tar.gz *