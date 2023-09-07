// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// use anyhow::{Context, Result};
// use dotenvy;
use tauri::api::dialog::message;
use tauri::plugin::TauriPlugin;
use tauri::{
    AppHandle, CustomMenuItem, Manager, Menu, MenuItem, Runtime, Submenu, Window, WindowBuilder,
    WindowMenuEvent,
};
use tauri_plugin_sql::{Builder as TauriSqlBuilder, Migration, MigrationKind, PluginConfig};
use tauri_plugin_store::Builder as TauriStoreBuilder;
use tauri_plugin_window_state::Builder as TauriWindowStateBuilder;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn open_problem_view<R: Runtime>(handle: AppHandle<R>, problem_id: String, title: String) {
    let url = format!("/problems/{}", problem_id.clone());
    if let Some(window) = handle.get_window("problem") {
        let _ = load_url(&window, &url);
        let _ = window.set_title(&title);
    } else {
        WindowBuilder::new(&handle, "problem", tauri::WindowUrl::App(url.into()))
            .title(title)
            .menu(Menu::new())
            .always_on_top(true)
            .build()
            .unwrap();
    }
}

fn load_url<R: Runtime>(window: &Window<R>, url: &str) -> tauri::Result<()> {
    let js = format!("window.location.replace('{}');", url);
    window.eval(&js)
}

fn main() {
    tauri::Builder::default()
        // .setup(|app| {
        //     let id = app.listen_global("event", handler)
        // })
        .menu(enable_menu())
        .on_menu_event(menu_handler)
        .plugin(enable_sql_plugin())
        .plugin(enable_store_plugin())
        .plugin(enable_window_state_plugin())
        .invoke_handler(tauri::generate_handler![greet, open_problem_view])
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

fn enable_menu() -> Menu {
    let tauri_menu = Submenu::new(
        "Tauri example",
        Menu::new()
            .add_item(CustomMenuItem::new("home", "Home").accelerator("CmdOrCtrl+1"))
            .add_item(CustomMenuItem::new("notes", "Notes").accelerator("CmdOrCtrl+2"))
            .add_item(CustomMenuItem::new("log", "Log").accelerator("CmdOrCtrl+3"))
            .add_item(CustomMenuItem::new("search", "Search notes").accelerator("CmdOrCtrl+4"))
            .add_native_item(MenuItem::Separator)
            .add_item(CustomMenuItem::new("version", "version info.."))
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Quit),
    );
    let notes = Submenu::new(
        "NOTES",
        Menu::new().add_item(CustomMenuItem::new("notes", "NOTES").accelerator("CmdOrCtrl+2")),
    );
    let log = Submenu::new(
        "LOG",
        Menu::new().add_item(CustomMenuItem::new("log", "LOG").accelerator("CmdOrCtrl+2")),
    );
    let search = Submenu::new(
        "SEARCH",
        Menu::new().add_item(CustomMenuItem::new("search", "SEARCH").accelerator("CmdOrCtrl+2")),
    );
    Menu::new()
        .add_submenu(tauri_menu)
        .add_submenu(notes)
        .add_submenu(log)
        .add_submenu(search)
        .add_native_item(MenuItem::Copy)
}

fn menu_handler<R: Runtime>(event: WindowMenuEvent<R>) {
    match event.menu_item_id() {
        "home" => {
            let _ = event.window().emit("page", "/");
        }
        "notes" => {
            let _ = event.window().emit("page", "/notes");
        }
        "log" => {
            let _ = event.window().emit("page", "/log");
        }
        "search" => {
            let _ = event.window().emit("page", "/search");
        }
        "version" => {
            let app_handle = event.window().app_handle();
            let msg = format!(
                "{} {}",
                app_handle.package_info().name,
                app_handle.package_info().version
            );
            let _ = message(
                Some(&event.window()),
                &msg,
                "Tauri example\nDeveloped by brklntmhwk",
            );
        }
        _ => {}
    }
}
