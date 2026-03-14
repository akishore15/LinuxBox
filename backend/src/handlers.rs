use actix_web::{HttpResponse, Responder};
use crate::docker_manager::{start_ubuntu_container, list_containers};

pub async fn start_instance() -> impl Responder {
    match start_ubuntu_container().await {
        Ok(info) => HttpResponse::Ok().json(info),
        Err(e) => HttpResponse::InternalServerError().body(e.to_string()),
    }
}

pub async fn list_instances() -> impl Responder {
    match list_containers().await {
        Ok(list) => HttpResponse::Ok().json(list),
        Err(e) => HttpResponse::InternalServerError().body(e.to_string()),
    }
}
