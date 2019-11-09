exports.exe = {};
exports.def = (server) => {
  exports.exe = () => {
    server.close();
  };
};
