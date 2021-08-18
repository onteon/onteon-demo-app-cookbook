basedir=$(pwd)

rm -r build

mkdir -p build/onteon-demo-app-cookbook/native/bin
mkdir -p build/onteon-demo-app-cookbook/native/conf
cp onteon-files/conf/native-conf.yml build/onteon-demo-app-cookbook/native/conf/conf.yml
cp target/*.war build/onteon-demo-app-cookbook/native/bin/app.war
cd build/onteon-demo-app-cookbook/native && zip -r ../../onteon-demo-app-cookbook-native *

cd ${basedir}

mkdir -p build/onteon-demo-app-cookbook/docker/bin
mkdir -p build/onteon-demo-app-cookbook/docker/conf
cp onteon-files/conf/docker-conf.yml build/onteon-demo-app-cookbook/docker/conf/conf.yml
cd build/onteon-demo-app-cookbook/docker && zip -r ../../onteon-demo-app-cookbook-docker *