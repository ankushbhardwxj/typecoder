"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_forge_1 = __importDefault(require("node-forge"));
let str = `func generateDigest(email string, password string) string {
  h := sha256.New()
  h.Write([]byte(email + password))
  return hex.EncodeToString(h.Sum(nil))
}
`;
console.log(node_forge_1.default.util.encode64(str));
//# sourceMappingURL=a.js.map