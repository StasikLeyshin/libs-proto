// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.32.0
// 	protoc        v4.25.1
// source: manage-server-service/proto/manage_server_service.proto

package pb

import (
	_ "github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2/options"
	_ "google.golang.org/genproto/googleapis/api/annotations"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

var File_manage_server_service_proto_manage_server_service_proto protoreflect.FileDescriptor

var file_manage_server_service_proto_manage_server_service_proto_rawDesc = []byte{
	0x0a, 0x37, 0x6d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x2d, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x2d,
	0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6d, 0x61,
	0x6e, 0x61, 0x67, 0x65, 0x5f, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x5f, 0x73, 0x65, 0x72, 0x76,
	0x69, 0x63, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x02, 0x70, 0x62, 0x1a, 0x1c, 0x67,
	0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x61, 0x70, 0x69, 0x2f, 0x61, 0x6e, 0x6e, 0x6f, 0x74, 0x61,
	0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x63, 0x2d, 0x67, 0x65, 0x6e, 0x2d, 0x6f, 0x70, 0x65, 0x6e, 0x61, 0x70, 0x69, 0x76,
	0x32, 0x2f, 0x6f, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2f, 0x61, 0x6e, 0x6e, 0x6f, 0x74, 0x61,
	0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x28, 0x6d, 0x61, 0x6e,
	0x61, 0x67, 0x65, 0x2d, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x2d, 0x73, 0x65, 0x72, 0x76, 0x69,
	0x63, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x32, 0xb5, 0x01, 0x0a, 0x0d, 0x4d, 0x61, 0x6e, 0x61, 0x67, 0x65,
	0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0xa3, 0x01, 0x0a, 0x0a, 0x47, 0x65, 0x74, 0x53,
	0x65, 0x72, 0x76, 0x65, 0x72, 0x73, 0x12, 0x15, 0x2e, 0x70, 0x62, 0x2e, 0x47, 0x65, 0x74, 0x53,
	0x65, 0x72, 0x76, 0x65, 0x72, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x16, 0x2e,
	0x70, 0x62, 0x2e, 0x47, 0x65, 0x74, 0x53, 0x65, 0x72, 0x76, 0x65, 0x72, 0x73, 0x52, 0x65, 0x73,
	0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x66, 0x92, 0x41, 0x50, 0x12, 0x0b, 0x47, 0x65, 0x74, 0x20,
	0x53, 0x65, 0x72, 0x76, 0x65, 0x72, 0x73, 0x1a, 0x41, 0x41, 0x50, 0x49, 0x20, 0xd0, 0xb4, 0xd0,
	0xbb, 0xd1, 0x8f, 0x20, 0xd0, 0xbf, 0xd0, 0xbe, 0xd0, 0xbb, 0xd1, 0x83, 0xd1, 0x87, 0xd0, 0xb5,
	0xd0, 0xbd, 0xd0, 0xb8, 0xd1, 0x8f, 0x20, 0xd1, 0x81, 0xd0, 0xb0, 0xd0, 0xba, 0xd1, 0x82, 0xd0,
	0xb8, 0xd0, 0xb2, 0xd0, 0xbd, 0xd1, 0x8b, 0xd1, 0x85, 0x20, 0xd1, 0x81, 0xd0, 0xb5, 0xd1, 0x80,
	0xd0, 0xb2, 0xd0, 0xb8, 0xd1, 0x81, 0xd0, 0xbe, 0xd0, 0xb2, 0x82, 0xd3, 0xe4, 0x93, 0x02, 0x0d,
	0x12, 0x0b, 0x2f, 0x76, 0x31, 0x2f, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x73, 0x42, 0x07, 0x5a,
	0x05, 0x2e, 0x2f, 0x3b, 0x70, 0x62, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var file_manage_server_service_proto_manage_server_service_proto_goTypes = []interface{}{
	(*GetServersRequest)(nil),  // 0: pb.GetServersRequest
	(*GetServersResponse)(nil), // 1: pb.GetServersResponse
}
var file_manage_server_service_proto_manage_server_service_proto_depIdxs = []int32{
	0, // 0: pb.ManageService.GetServers:input_type -> pb.GetServersRequest
	1, // 1: pb.ManageService.GetServers:output_type -> pb.GetServersResponse
	1, // [1:2] is the sub-list for method output_type
	0, // [0:1] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_manage_server_service_proto_manage_server_service_proto_init() }
func file_manage_server_service_proto_manage_server_service_proto_init() {
	if File_manage_server_service_proto_manage_server_service_proto != nil {
		return
	}
	file_manage_server_service_proto_server_proto_init()
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_manage_server_service_proto_manage_server_service_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   0,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_manage_server_service_proto_manage_server_service_proto_goTypes,
		DependencyIndexes: file_manage_server_service_proto_manage_server_service_proto_depIdxs,
	}.Build()
	File_manage_server_service_proto_manage_server_service_proto = out.File
	file_manage_server_service_proto_manage_server_service_proto_rawDesc = nil
	file_manage_server_service_proto_manage_server_service_proto_goTypes = nil
	file_manage_server_service_proto_manage_server_service_proto_depIdxs = nil
}
