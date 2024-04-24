"use client";

import { getInformation } from "@/app/actions/user/getInformation";
import Loader from "@/app/components/Loader";
import { useAuth } from "@/app/hooks/useAuth";
import type { User } from "@/app/types";
import { Suspense, useEffect, useState } from "react";

export default function ProfilePage() {
	const { jwt } = useAuth();
	const [user, setUser] = useState<User>();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!jwt) return;
		getInformation(jwt).then((res) => setUser(res));
	}, []);

	return (
		<Suspense fallback={<Loader />}>
			<div className="max-w-[1200px] m-auto">
				{user && (
					<div className="bg-white overflow-hidden shadow rounded-lg border mt-5">
						<div className="px-4 py-5 sm:px-6">
							<h3 className="text-lg leading-6 font-medium text-gray-900">
								User Profile
							</h3>
							<p className="mt-1 max-w-2xl text-sm text-gray-500">
								This is some information about the user.
							</p>
						</div>
						<div className="border-t border-gray-200 px-4 py-5 sm:p-0">
							<dl className="sm:divide-y sm:divide-gray-200">
								<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">
										Username
									</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{user.username}
									</dd>
								</div>
								<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">Email</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{user.email}
									</dd>
								</div>
								<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">Phone</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{user.phone ?? "-"}
									</dd>
								</div>
								<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">
										Create at
									</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{new Date(user.updatedAt).toLocaleString()}
									</dd>
								</div>
								<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">
										Provider
									</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{user.provider}
									</dd>
								</div>
							</dl>
						</div>
					</div>
				)}
			</div>
		</Suspense>
	);
}
