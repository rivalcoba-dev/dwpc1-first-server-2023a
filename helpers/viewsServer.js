export default (_, res) => (view, satusCode = 200) => {
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = satusCode;
  res.write(view);
  res.end();
}