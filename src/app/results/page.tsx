"use client"; // Needed for Next.js App Router

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ScrollArea } from "@app/components/ui/scroll-area"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@app/components/ui/tabs"
import { Separator } from "@app/components/ui/separator";
import { ExternalLink } from "@app/components/functions/external-link";

const ResultsPage = () => {
    const router = useRouter();
    const [notFollowedBack, setNotFollowedBack] = useState<string[]>([]); // They don't follow
    const [notFollowingBack, setNotFollowingBack] = useState<string[]>([]); // You don't follow
    const [followers, setFollowers] = useState<string[]>([]);
    const [following, setFollowing] = useState<string[]>([]);

    useEffect(() => {
        const storedFollowers = localStorage.getItem("followersContent"); // They follow
        const storedFollowing = localStorage.getItem("followingContent"); // You follow

        if (!storedFollowers || !storedFollowing) {
            router.push("/"); // Redirect to home if no data
            return;
        } else if (storedFollowers && storedFollowing) {
            const followersList = JSON.parse(storedFollowers) as string[]; // They follow
            setFollowers(followersList.sort((a, b) => a.localeCompare(b)));
            const followingList = JSON.parse(storedFollowing) as string[]; // You follow
            setFollowing(followingList.sort((a, b) => a.localeCompare(b)));

            // Find users you follow, but they don't follow you back
            const notFollowedBackList = followingList.filter(user => !followersList.includes(user)).sort((a, b) => a.localeCompare(b));
            setNotFollowedBack(notFollowedBackList);

            // Find users who follow you, but you don’t follow them back
            const notFollowingBackList = followersList.filter(user => !followingList.includes(user)).sort((a, b) => a.localeCompare(b));
            setNotFollowingBack(notFollowingBackList);
        }
    }, [router]);

    return (
        <div className="max-w-2xl mx-auto my-5 p-6 bg-white dark:bg-black shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Comparison Results</h1>

            <Tabs defaultValue="not-following-back">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="not-followed-back">They don&apos;t follow</TabsTrigger>
                    <TabsTrigger value="not-following-back">You don&apos;t follow</TabsTrigger>
                    <TabsTrigger value="followers">Your followers</TabsTrigger>
                    <TabsTrigger value="following">Your following</TabsTrigger>
                </TabsList>
                <TabsContent value="not-followed-back">
                    <ScrollArea className="rounded-md border p-4">
                        <ul>
                            {notFollowedBack.length > 0 ? notFollowedBack.map(user =>
                                <>
                                    <li key={user} className="py-3">
                                        <ExternalLink url={`https://instagram.com/${user}`} text={user} />
                                    </li>
                                    <Separator />
                                </>) : <p>Everyone follows you back</p>}
                        </ul>
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="not-following-back">
                    <ScrollArea className="rounded-md border p-4">
                        <ul>
                            {notFollowingBack.length > 0 ? notFollowingBack.map(user =>
                                <>
                                    <li key={user} className="py-3">
                                        <ExternalLink url={`https://instagram.com/${user}`} text={user} />
                                    </li>
                                    <Separator />
                                </>) : <p>You follow everyone who follows you</p>}
                        </ul>
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="followers">
                    <ScrollArea className="rounded-md border p-4">
                        <ul>
                            {followers.length > 0 ? followers.map(user =>
                                <>
                                    <li key={user} className="py-3">
                                        <ExternalLink url={`https://instagram.com/${user}`} text={user} />
                                    </li>
                                    <Separator />
                                </>) : <p>No followers found</p>}
                        </ul>
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="following">
                    <ScrollArea className="rounded-md border p-4">
                        <ul>
                            {following.length > 0 ? following.map(user =>
                                <>
                                    <li key={user} className="py-3">
                                        <ExternalLink url={`https://instagram.com/${user}`} text={user} />
                                    </li>
                                    <Separator />
                                </>) : <p>No following found</p>}
                        </ul>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ResultsPage;