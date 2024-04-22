"use client";

import React, { useEffect } from "react";
import { BsChatRightDots } from "react-icons/bs";
import { io } from "socket.io-client";
import ChatPanel from "./ChatPanel";

export type TMessage = {
	message: string;
	sender: string;
};

let socket: any;

const HelpWidget = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [reply, setReply] = React.useState(0);
	const [text, setText] = React.useState("");
	const [messages, setMessages] = React.useState<TMessage[]>([]);

	const handleCloseWidget = () => {
		setIsOpen(false);
	};

	const handleOpenSupportWidget = () => {
		setIsOpen(true);
	};

	const handleSendMessage = (e: any) => {
		// e.preventDefault();
		// setMessages([...messages, { message: text, sender: "client" }]);
		// setReply(reply + 1);
		// setText("");
		e.preventDefault();

		socket.emit("send-message", {
			username: "Hallo",
			message: text,
		});

		setText("");
	};

	useEffect(() => {
		socketInitializer();
	}, []);

	async function socketInitializer() {
		await fetch("/api/socket");

		socket = io();

		socket.on("receive-message", (data: TMessage) => {
			setMessages((pre) => [...pre, data]);
		});
	}

	return isOpen ? (
		<div
			className="
      fixed bottom-10 right-10 rounded-3xl border-1 border-gray-300
      flex h-96 w-fit flex-col justify-between bg-white p-6 z-20"
		>
			<ChatPanel
				text={text}
				setText={setText}
				messages={messages}
				onClose={handleCloseWidget}
				handleSendMessage={handleSendMessage}
			/>
		</div>
	) : (
		<button
			onClick={handleOpenSupportWidget}
			className="
        fixed bottom-10 right-10 cursor-pointer bg-blue-400 p-4
        text-white hover:bg-blue-500 rounded-full
      "
		>
			<BsChatRightDots />
		</button>
	);
};

export default HelpWidget;
