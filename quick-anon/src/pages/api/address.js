export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // console.log(address);
    
    const address = req.query.addr;
    console.log(address);
    res.status(200).json({"addr": address})
  }