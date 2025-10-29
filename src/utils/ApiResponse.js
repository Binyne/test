export default class ApiResponse {
  static ok(data, meta) { return { success: true, data, meta }; }
  static created(data) { return { success: true, data }; }
  static fail(message, code = 400) { return { success: false, message, code }; }
}
