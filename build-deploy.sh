#!/bin/bash

## Vars
dockerTag=01
repository="somerepo"
imageName="someimage"
helmReleaseName="sw-0"

## Docker
cd signalr-web
docker build -t $repository/$image:$dockerTag .
docker push $repository/$image:$dockerTag

## Helm/Kubernetes
cd helm

## Helm Template executes a dry run to double check the generated yaml
#helm template signalr-web --set image.tag=$dockerTag,image.repository=$repository/$imageName

## Upgrades Helm release, installs if it doesnt exist
helm upgrade -i $helmReleaseName signalr-web --set image.tag=$dockerTag,image.repository=$repository/$imageName