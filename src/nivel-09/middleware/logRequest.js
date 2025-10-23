const logRequest = (req, res , next) => {
  const method = req.method;
  const url = req.url;
  const data = new Date().toLocaleString();
  console.log(`[${data}] ${method} ${url}`);
  
  next();
}

export default logRequest;