"use client";

import { useRouter } from "next/navigation";
import JSZip from "jszip";

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

            const extractFollowerUsernames = (htmlString: string): string[] => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlString, "text/html");
            
                const usernameElements = doc.querySelectorAll("a");
            
                const usernames = Array.from(usernameElements)
                    .map(el => el.textContent?.trim() || "")
                    .filter(username => username.length > 0);
            
                return usernames;
            };

            const extractFollowingUsernames = (htmlString: string): string[] => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlString, "text/html");
            
                const usernameElements = doc.querySelectorAll("h2");
            
                const usernames = Array.from(usernameElements)
                    .map(el => el.textContent?.trim() || "")
                    .filter(username => username.length > 0);
            
                return usernames;
            };

            for (const fileName of filteredFiles) {
                const file = zipData.files[fileName];

                if (!file.dir && (fileName == `${folderName}/following.html` || fileName == `${folderName}/followers_1.html`)) {
                    const content = await file.async("text");

                    if (fileName == `${folderName}/followers_1.html`) followersContent = extractFollowerUsernames(content);
                    else if (fileName == `${folderName}/following.html`) followingContent = extractFollowingUsernames(content);
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
