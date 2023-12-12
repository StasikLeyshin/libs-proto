goCmd ?= go

DIR_GRPC_GATEWAY=grpc-gateway
DIR_GRPC=grpc

DIR_MANAGE_SERVER_SERVICE=manage-server-service
DIR_ROLE_SERVICE=role-service


ifeq ($(shell echo "check_quotes"),"check_quotes")
   WINDOWS := yes
else
   WINDOWS := no
endif

ifeq ($(WINDOWS),yes)
   mkdir = mkdir $(subst /,\,$(1)) > nul 2>&1 || (exit 0)
   echo = echo $(1)
else
   mkdir = mkdir -p $(1)
   echo = echo $(1)
endif

gen_grpc_gateway_proto = protoc --proto_path=$(DIR_GRPC_GATEWAY) \
                                --go_out=$(DIR_GRPC_GATEWAY)/$(1)/pb \
                                --go-grpc_out=$(DIR_GRPC_GATEWAY)/$(1)/pb \
                                --grpc-gateway_out=$(DIR_GRPC_GATEWAY)/$(1)/pb \
                                --openapiv2_out=$(DIR_GRPC_GATEWAY)/doc/swagger \
                                --openapiv2_opt=allow_merge=true,merge_file_name=$(1) \
                                $(DIR_GRPC_GATEWAY)/$(1)/proto/*.proto

gen_grpc_proto = protoc --proto_path=$(DIR_GRPC) \
                         --go_out=$(DIR_GRPC)/$(1)/pb \
                         --go-grpc_out=$(DIR_GRPC)/$(1)/pb \
                         --grpc-gateway_out=$(DIR_GRPC)/$(1)/pb \
                         $(DIR_GRPC)/$(1)/proto/*.proto

all: gen_grpc_gateway_manage_server_service \
     gen_grpc_manage_server_service \
     gen_grpc_gateway_role_service

gen_grpc_gateway_manage_server_service:
	$(call mkdir,$(DIR_MANAGE_SERVER_SERVICE))
	$(call gen_grpc_gateway_proto,$(DIR_MANAGE_SERVER_SERVICE))

gen_grpc_manage_server_service:
	$(call mkdir,$(DIR_MANAGE_SERVER_SERVICE))
	$(call gen_grpc_proto,$(DIR_MANAGE_SERVER_SERVICE))

gen_grpc_gateway_role_service:
	$(call mkdir,$(DIR_ROLE_SERVICE))
	$(call gen_grpc_gateway_proto,$(DIR_ROLE_SERVICE))