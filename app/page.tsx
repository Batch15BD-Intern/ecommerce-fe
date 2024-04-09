"use client";

import { URL_API } from "./layout";

export default function Home() {
	function loginWithGithub() {
		console.log("login with github");
		window.location.href = `${URL_API}/api/connect/github`;
	}

	return (
		<>
			<div>
				<button onClick={loginWithGithub}>Login with Github</button>
			</div>
		</>
	);
}
