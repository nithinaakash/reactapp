import http from "../http-common";

class meetingDetailService {
  getAll() {
    return http.get("/meetings");
  }

  get(id) {
    return http.get(`/meetings/${id}`);
  }

  create(data) {
    return http.post("/meetings", data);
  }
  sendmail(data) {
      return http.post("/meetings/mail", data);
    }

  update(id, data) {
    return http.put(`/meetings/${id}`, data);
  }

  delete(id) {
    return http.delete(`/meetings/${id}`);
  }

  deleteAll() {
    return http.delete(`/meetings`);
  }

  findByTitle(title) {
    return http.get(`/meetings?title=${title}`);
  }
}

export default new meetingDetailService();