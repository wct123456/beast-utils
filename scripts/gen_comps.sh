#!/bin/sh
# 当前项目的根目录
base_dir=$(cd "$(dirname "$0")";cd ../src/components;pwd)
#echo ${base_dir}

function writeIndex() {
    echo $1
    echo export {default as $($1)} from './src/components/$($1)';\n >> index.x
}

function getdir(){
#    echo $1
    for file in $1/*
    do
    file_name=""

    if test -f $file
    then
        file_name=$(basename $file .tsx)
        echo ${file_name}
    else
        file_name=$(basename $file)
    fi

    writeIndex ${file_name}

    done
}
getdir ${base_dir}
