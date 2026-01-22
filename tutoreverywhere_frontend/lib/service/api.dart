import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';
import '../models/jwt.dart';
import '../models/auth.dart';

part 'api.g.dart';

@RestApi(baseUrl: "http://localhost:3000")
abstract class RestClient {
  factory RestClient(Dio dio, {String baseUrl}) = _RestClient;

  @POST("/auth")
  Future<Jwt> login(@Body() Auth auth);

  @POST("/auth")
  Future<HttpResponse<Jwt>> testLogin(@Body() Auth auth);
}
