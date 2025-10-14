PROJECT_NAME := "BrainBuster"
#DOCKER_COMPOSE_FILE := $(shell pwd)/compose.yaml
ACTIVE_BRANCH := $(shell git branch -v | grep '*' | tr -d '*' | tr -d ' ')

#Docker
mysql-sh:
	docker exec -it brainbuster-mysql sh -c "mysql -u root brainbusterdb -prootroot";

#Git
update:
	git switch main; \
	git fetch -p; \
	git pull origin --force; \
	git clean -fd 
rm-branches:
	git switch main; \
	git branch | grep -v "main" | xargs git branch -D 
cb:
	@read -p "Branch name: " BRANCH_NAME; \
	git switch main; \
	git pull origin main; \
	git fetch -p; \
	git branch $$BRANCH_NAME
ccb:
	@read -p "Branch name: " BRANCH_NAME; \
	git checkout main; \
	git pull origin main; \
	git fetch -p; \
	git checkout -b $$BRANCH_NAME