import httpStatus from "http-status";

export default class StatusGetController {
  async run(_req, res) {
    res.status(httpStatus.OK).send({ status: 'healthy' });
  }
}
