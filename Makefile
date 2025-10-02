PROJECT_NAME := "BrainBuster"
#DOCKER_COMPOSE_FILE := $(shell pwd)/compose.yaml
#test
#test
#test
ACTIVE_BRANCH := $(shell git branch -v | grep '*' | tr -d '*' | tr -d ' ')

#Git
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