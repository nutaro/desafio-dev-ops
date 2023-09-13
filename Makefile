.PHONY: create-cluster
create-cluster:
	kind create cluster --name devops

.PHONY: delete-cluster
delete-cluster:
	kind delete cluster --name devops

.PHONY: up-services
up-services:
	kubectl apply -f backend/k8s/manifest.yaml
	kubectl apply -f sql/k8s/manifest.yaml