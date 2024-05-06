"use client";

import Profile from "@/app/(auth)/profile/Profile";
import OrderPage from "@/app/(home)/order/page";
import { getInformation } from "@/app/actions/user/getInformation";
import { useAuth } from "@/app/hooks/useAuth";
import type { User } from "@/app/types";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function ProfilePage() {
	const { jwt } = useAuth();
	const [user, setUser] = useState<User>();
	const [isLoading, setIsLoading] = useState(true);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!jwt) return;
		getInformation(jwt).then((res) => {
			setUser(res);
			setIsLoading(false);
		});
	}, []);

	return (
		<div className="max-w-[1200px] m-auto">
			<div>
				<Tabs aria-label="Options">
					<Tab key="profile" title="Profile">
						<Card>
							<CardBody>
								<Profile user={user} />
							</CardBody>
						</Card>
					</Tab>
					<Tab key="orders" title="Orders">
						<Card>
							<CardBody>
								<OrderPage />
							</CardBody>
						</Card>
					</Tab>
				</Tabs>
			</div>
		</div>
	);
}
