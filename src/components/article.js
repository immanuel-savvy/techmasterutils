import React from "react";

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div class="col-lg-6">
        <div class="card text-center mb-5">
          <div class="card-header p-0">
            <div class="blog-media">
              <img
                src={require("../libs/assets/imgs/blog-2.jpg")}
                alt=""
                class="w-100"
              />
              <a href="#" class="badge badge-primary">
                #Placeat
              </a>
            </div>
          </div>
          <div class="card-body px-0">
            <h5 class="card-title mb-2">Voluptates Corporis Placeat</h5>
            <small class="small text-muted">
              January 20 2019
              <span class="px-2">-</span>
              <a href="#" class="text-muted">
                34 Comments
              </a>
            </small>
            <p class="my-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
              saepe dolores et nostrum porro odit reprehenderit animi, est
              ratione fugit aspernatur ipsum. Nostrum placeat hic saepe
              voluptatum dicta ipsum beatae.
            </p>
          </div>

          <div class="card-footer p-0 text-center">
            <a href="single-post.html" class="btn btn-outline-dark btn-sm">
              READ MORE
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Article;
