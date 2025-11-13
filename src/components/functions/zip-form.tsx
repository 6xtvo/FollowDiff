"use client";

import { useRouter } from "next/navigation";
import JSZip from "jszip";
import type { Entry } from "@app/types/parse";

interface ZipFormProps {
    children: React.ReactNode;
}

function ZipForm({ children }: ZipFormProps) {
    const router = useRouter();

    return <form onSubmit={async e => {
        e.preventDefault();

        const zipInput = document.getElementById("zip") as HTMLInputElement;
        const noZip = document.getElementById("no-zip") as HTMLSpanElement;
        const errorZip = document.getElementById("error-zip") as HTMLSpanElement;
        const invalidZip = document.getElementById("invalid-zip") as HTMLSpanElement;
        const nothtmlZip = document.getElementById("nohtml-zip") as HTMLSpanElement;

        if (!zipInput.files || zipInput.files.length == 0) {
            noZip.classList.remove("hidden");
            noZip.style.display = "block";

            return;
        }

        const zipFile = zipInput.files[0];
        const zip = new JSZip();

        if (!zipFile.name.endsWith(".zip") && !zipFile.name.startsWith("instagram-")) {
            invalidZip.classList.remove("hidden");
            invalidZip.style.display = "block";

            return;
        }

        try {
            const zipData = await zip.loadAsync(zipFile);
            const folderName = "connections/followers_and_following";

            const filteredFiles = Object.keys(zipData.files).filter((fileName) =>
                fileName.startsWith(folderName)
            );

            if (filteredFiles.length === 0) {
                invalidZip.classList.remove("hidden");
                invalidZip.style.display = "block";

                return console.error(`No files found in the '${folderName}' folder.`);
            }

            let followersContent: string[] = [];
            let followingContent: string[] = [];

            const extractFollowerUsernames = (jsonString: string): string[] => {
                const docs = JSON.parse(jsonString);
                const usernames = docs.map((entry: Entry) => entry.string_list_data[0].value)
            
                return usernames;
            };

            const extractFollowingUsernames = (jsonString: string): string[] => {
                const docs = JSON.parse(jsonString).relationships_following;
                const usernames = docs.map((entry: Entry) => entry.title)
            
                return usernames;
            };

            if (!filteredFiles.some(fileName => fileName.includes(".json"))) {
                nothtmlZip.classList.remove("hidden");
                nothtmlZip.style.display = "block";
            }

            for (const fileName of filteredFiles) {
                const file = zipData.files[fileName];

                if (!file.dir && (fileName == `${folderName}/following.json` || fileName == `${folderName}/followers_1.json`)) {
                    const content = await file.async("text");

                    if (fileName == `${folderName}/followers_1.json`) followersContent = extractFollowerUsernames(content);
                    else if (fileName == `${folderName}/following.json`) followingContent = extractFollowingUsernames(content);
                }
            }

            if (followersContent.length == 0 || followingContent.length == 0) {
                invalidZip.classList.remove("hidden");
                invalidZip.style.display = "block";

                return console.error("Files were not found");
            }

            localStorage.setItem("followersContent", JSON.stringify(followersContent));
            localStorage.setItem("followingContent", JSON.stringify(followingContent));

            router.push("/results");
        } catch (error) {
            errorZip.classList.remove("hidden");
            errorZip.style.display = "block";

            return console.error("Error processing ZIP file:", error);
        }
    }}>
        {children}
    </form>
}

export { ZipForm }
