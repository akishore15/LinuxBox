mod handlers;
mod models;
mod docker_manager;

use actix_web::{App, HttpServer};
use handlers::{start_instance, list_instances};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("LinuxBox Rust backend running on http://127.0.0.1:8080");
    HttpServer::new(|| {
        App::new()
            .route("/start_instance", actix_web::web::post().to(start_instance))
            .route("/list_instances", actix_web::web::get().to(list_instances))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
