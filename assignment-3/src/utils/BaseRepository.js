class BaseService {
  constructor(model) {
    this.model = model;
  }
  getAll = async () => {
    return await this.model?.find().lean();
  };
  getById = async (id) => {
    return await this.model?.findById(id).lean();
  };
  create = async (object) => {
    return await this.model?.create(object);
  };
  update = async (id, updateObj) => {
    return await this.model?.findByIdAndUpdate(id, updateObj, {
      upsert: true,
      new: true,
    });
  };
  delete = async (id) => {
    return await this.model?.findByIdAndRemove(id).lean();
  };
}
module.exports = BaseService;
