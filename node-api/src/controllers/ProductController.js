const mongoose = require('mongoose');

const Product = mongoose.model('Product')

module.exports = {
  async index(require, response) {
    const { page = 1 } = require.query;
    const products = await Product.paginate({}, { page, limit: 10 });

    return response.json(products)
  },

  async show(require, response) {
    const product = await Product.findById(require.params.id);

    return response.json(product);
  },

  async store(require, response) {
    const product = await Product.create(require.body);

    return response.json(product);
  },

  async update(require, response) {
    const product = await Product.findByIdAndUpdate(require.params.id, require.body, { new: true });

    return response.json(product);
  },

  async destroy(require, response) {
    await Product.findByIdAndRemove(require.params.id);

    return response.send();
  },
}