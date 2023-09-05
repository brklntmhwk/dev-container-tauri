// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// use anyhow::{Context, Result};
use dotenvy;
use serde::{Deserialize, Serialize};
// use sqlx::postgres::{PgPool, PgPoolOptions};
use tauri::plugin::TauriPlugin;
use tauri::{CustomMenuItem, Manager, Menu, MenuItem, Runtime};
use tauri_plugin_sql::{Builder as TauriSqlBuilder, Migration, MigrationKind, PluginConfig};
use tauri_plugin_store::Builder as TauriStoreBuilder;
use tauri_plugin_window_state::Builder as TauriWindowStateBuilder;

#[derive(Serialize)]
struct Data {
    id: i32,
    content: String,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// #[tauri::command]
// async fn handle_add_note() -> Result<()> {
//     Ok(())
// }

fn main() {
    tauri::Builder::default()
        .plugin(enable_sql_plugin())
        .plugin(enable_store_plugin())
        .plugin(enable_window_state_plugin())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn enable_sql_plugin<R: Runtime>() -> TauriPlugin<R, Option<PluginConfig>> {
    TauriSqlBuilder::default()
        .add_migrations(
            "postgres://postgres:postgres@localhost:5432/db",
            vec![Migration {
                version: 1,
                description: "Create tables",
                sql: include_str!("../migrations/202309041539_create_tables.sql"),
                kind: MigrationKind::Up,
            }],
        )
        .build()
}

fn enable_store_plugin<R: Runtime>() -> TauriPlugin<R> {
    TauriStoreBuilder::default().build()
}

fn enable_window_state_plugin<R: Runtime>() -> TauriPlugin<R> {
    TauriWindowStateBuilder::default().build()
}
