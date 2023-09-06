import { invoke } from "@tauri-apps/api/tauri";

async function greet(name: string): Promise<string> {
    return invoke("greet", { name });
}

export { greet }
