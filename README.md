# Desafio técnico - Cubos DevOps

Este é um documento com os materiais que serão disponibilizado para o desafio técnico.

#### requisitos

- ***make***
- ***kubectl***
- ***kind ou um k8s cluster***

caso kind pode se executar: **make create-cluster** 
caso outra solução de k8s: **skip**

#### up services

***make up-services***

#### port-forward
pode acessar o frontend: **kubectl port-forward service/reverse-proxy-svc 8000:80**


#### loadbalancer
caso queira uma solução de loadbalancer então podera acessar o servico na porta 80 no ip que lhe for assinado:

- descubra qual range de ips lhe está disponivel no caso utilizei kind: **docker network inspect -f '{{.IPAM.Config}}' kind**
- edite o arquivo: metallb/pool.yaml linha 8 com o range correto
- então: **make install-metallb**


#### Terraform
Não utilizei terraform no projeto pelo fato de não ter visto a necessidade de utilizar o mesmo neste projeto.
caso queiram avaliar meu uso de HCL https://github.com/nutaro/kubernetes-ansible-vagrant/blob/master/Vagrantfile