.PHONY: create-cluster
create-cluster:
	kind create cluster --name devops

.PHONY: delete-cluster
delete-cluster:
	kind delete cluster --name devops

.PHONY: up-services
up-services:
	kubectl apply -f sql/k8s/manifest.yaml
	kubectl apply -f frontend/k8s/manifest.yaml
	kubectl apply -f backend/k8s/manifest.yaml

.PHONY: install-metallb
install-metallb:
	kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.13.11/config/manifests/metallb-native.yaml
	kubectl wait --namespace metallb-system \
                --for=condition=ready pod \
                --selector=app=metallb \
                --timeout=90s
	kubectl apply -f metallb/pool.yaml