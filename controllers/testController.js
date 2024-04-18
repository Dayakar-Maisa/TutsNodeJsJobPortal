const testPostController = (req, res) => {
  try {
    const { name } = req.body;
    res.status(200).send(`your name is ${name}`);
  } catch (error) {
    //console.log(error);
  }
};

export default testPostController;
