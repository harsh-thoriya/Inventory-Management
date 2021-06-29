  exports.successResponse = function (req, res, data, message = 'Operation successfully completed!', code = 200) {
    res.status(code);
    res.send({
      code,
      success: true,
      message,
      data,
    });
  };
  
  exports.errorResponse = function (req, res, error, errorMessage = "Some error occured!", code = 500 ) {
    res.status(code);
    res.send({
      code,
      errorMessage, 
      error, 
      success: false,
    });
  };
  
  