// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             v4.25.1
// source: manage-server-service/proto/manage_server_service.proto

package __

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	ManageService_GetServers_FullMethodName = "/pb.ManageService/GetServers"
)

// ManageServiceClient is the client API for ManageService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ManageServiceClient interface {
	GetServers(ctx context.Context, in *GetServersRequest, opts ...grpc.CallOption) (*GetServersResponse, error)
}

type manageServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewManageServiceClient(cc grpc.ClientConnInterface) ManageServiceClient {
	return &manageServiceClient{cc}
}

func (c *manageServiceClient) GetServers(ctx context.Context, in *GetServersRequest, opts ...grpc.CallOption) (*GetServersResponse, error) {
	out := new(GetServersResponse)
	err := c.cc.Invoke(ctx, ManageService_GetServers_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ManageServiceServer is the server API for ManageService service.
// All implementations must embed UnimplementedManageServiceServer
// for forward compatibility
type ManageServiceServer interface {
	GetServers(context.Context, *GetServersRequest) (*GetServersResponse, error)
	mustEmbedUnimplementedManageServiceServer()
}

// UnimplementedManageServiceServer must be embedded to have forward compatible implementations.
type UnimplementedManageServiceServer struct {
}

func (UnimplementedManageServiceServer) GetServers(context.Context, *GetServersRequest) (*GetServersResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetServers not implemented")
}
func (UnimplementedManageServiceServer) mustEmbedUnimplementedManageServiceServer() {}

// UnsafeManageServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ManageServiceServer will
// result in compilation errors.
type UnsafeManageServiceServer interface {
	mustEmbedUnimplementedManageServiceServer()
}

func RegisterManageServiceServer(s grpc.ServiceRegistrar, srv ManageServiceServer) {
	s.RegisterService(&ManageService_ServiceDesc, srv)
}

func _ManageService_GetServers_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetServersRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ManageServiceServer).GetServers(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: ManageService_GetServers_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ManageServiceServer).GetServers(ctx, req.(*GetServersRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// ManageService_ServiceDesc is the grpc.ServiceDesc for ManageService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var ManageService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "pb.ManageService",
	HandlerType: (*ManageServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetServers",
			Handler:    _ManageService_GetServers_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "manage-server-service/proto/manage_server_service.proto",
}