"use client";

import {useState} from "react";

import {authClient} from "@/lib/auth-client";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function Home() {
    const { data: session } = authClient.useSession();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async () => {
        await authClient.signUp.email({
            email,
            name,
            password,
        }, {
            onError: (err) => {
                window.alert("Something went wrong on registration!");
            },
            onSuccess: (data) => {
                window.alert("Successfully registered!");
            }
        });
    };

    if( session) {
        return (
            <div className="flex flex-col p-4 gap-y-4">
                <p>Logged in as {session.user.name}</p>
                <Button onClick={() => authClient.signOut()}>Sign out</Button>
            </div>
        );
    }

    return (
        <div className="p-5 m-2 gap-y-4 rounded-2xl bg-blue-400 flex flex-col items-center justify-center">
            <Input
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-xl font-bold bg-white"
            />
            <Input
                placeholder="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-xl font-bold bg-white"
            />
            <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-xl font-bold bg-white"
            />

            <Button onClick={onSubmit}>Create User</Button>
        </div>
    );
};
