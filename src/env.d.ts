<<<<<<< HEAD
=======
/// <reference path="../.astro/db-types.d.ts" />
>>>>>>> 48207568d33804e4e2ee43d468de569d6a85aad9
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
	interface Locals {
		session: import("lucia").Session | null;
		user: import("lucia").User | null;
	}
}