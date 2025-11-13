import { TextAnimate } from "@app/components/magicui/text-animate";
import { ColoredButton } from "@app/components/ui/colored-button";
import { DialogHeader, DialogFooter } from "@app/components/ui/dialog";
import { Input } from "@app/components/ui/input";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@app/components/ui/dialog";
import { ZipForm } from "@app/components/functions/zip-form";
import { ExternalLink } from "@app/components/functions/external-link";
import { Metadata } from "next";

import Instagram from "@app/components/icons/instagram";

export const metadata: Metadata = {
    title: "FollowDiff",
    description:
        "A free tool that generates a list of who doesn't follow back and who you don't follow back on Instagram.",
    metadataBase: new URL("https://follow-diff.vercel.app/"),
    keywords: [
        "instagram",
        "followers",
        "follow",
        "following",
        "back",
        "compare",
        "difference",
        "diff",
        "list",
        "ig",
        "comparison",
        "comparer",
    ],
};

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-full gap-y-10">
            <div className="w-2/3 flex flex-col justify-center items-center gap-y-10 text-center">
                <TextAnimate
                    className="scroll-m-20 text-4xl md:text-5xl font-extrabold tracking-tight lg:text-6xl"
                    animation="slideUp"
                    by="word"
                >
                    Who doesn&apos;t follow back? Let&apos;s find out together.
                </TextAnimate>

                <span>
                    Welcome to FollowDiff, a free tool that generates a list of
                    who doesn&apos;t follow back and who you don&apos;t follow
                    back on Instagram. Click the <strong>Help</strong> button to get started.
                </span>

                <div className="flex flex-row items-center gap-x-5">
                    <Dialog>
                        <DialogTrigger asChild>
                            <ColoredButton>Upload</ColoredButton>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <ZipForm>
                                <DialogHeader>
                                    <DialogTitle>Upload ZIP</DialogTitle>
                                    <DialogDescription>
                                        Upload your downloaded Instragam{" "}
                                        <strong>followers and following</strong>{" "}
                                        ZIP file here and press the &quot;Check
                                        now&quot; button.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid w-full max-w-sm justify-center items-center gap-3 py-5 text-center">
                                    <Input
                                        className="cursor-pointer hover:brightness-75"
                                        id="zip"
                                        type="file"
                                        accept=".zip"
                                    />
                                    <span
                                        className="text-red-500 text-xs text-center hidden"
                                        id="no-zip"
                                    >
                                        Please upload a ZIP file.
                                    </span>
                                    <span
                                        className="text-red-500 text-xs text-center hidden"
                                        id="error-zip"
                                    >
                                        An error occurred.
                                    </span>
                                    <span
                                        className="text-red-500 text-xs text-center hidden"
                                        id="invalid-zip"
                                    >
                                        Invalid ZIP provided.
                                    </span>
                                    <span
                                        className="text-red-500 text-xs text-center hidden"
                                        id="nohtml-zip"
                                    >
                                        Please use JSON files in your zip.
                                    </span>
                                </div>
                                <DialogFooter>
                                    <button
                                        className="flex justify-center items-center w-full"
                                        type="submit"
                                    >
                                        <ColoredButton>Check now</ColoredButton>
                                    </button>
                                </DialogFooter>
                            </ZipForm>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild>
                            <ColoredButton>Help</ColoredButton>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <ZipForm>
                                <DialogHeader>
                                    <DialogTitle>
                                        How do I get started?
                                    </DialogTitle>
                                    <DialogDescription>
                                        <ol className="flex flex-col gap-y-3 list-decimal ml-4 mt-3">
                                            <li>
                                                Head to Instagram&apos;s{" "}
                                                <strong>Account Center</strong>{" "}
                                                {">"}{" "}
                                                <strong>
                                                    Your information and
                                                    permissions
                                                </strong>{" "}
                                                {">"}{" "}
                                                <strong>
                                                    <ExternalLink
                                                        url="https://accountscenter.instagram.com/info_and_permissions/dyi/"
                                                        text="Export your information"
                                                    />
                                                </strong>
                                            </li>
                                            <li>
                                                Press{" "}
                                                <strong>
                                                    Create export
                                                </strong>{" "}
                                                {">"}{" "}
                                                <strong>
                                                    Export to device
                                                </strong>
                                            </li>
                                            <li>
                                                Click on {" "}
                                                <strong>Customize information</strong> and
                                                unselect everything except{" "}
                                                <strong>
                                                    Followers and following
                                                </strong>,{" "}
                                                then press <strong>Save</strong>
                                            </li>
                                            <li>
                                                Click on{" "}
                                                <strong>
                                                    Format
                                                </strong>{" "}
                                                and select{" "}
                                                <strong>JSON</strong>,{" "}
                                                then press <strong>Save</strong>. Be sure to also select {" "}<strong>All time</strong> for{" "}
                                                <strong>Date range</strong> and then press{" "}
                                                <strong>Save</strong>. Once done, press{" "}
                                                <strong>Start export</strong>.
                                            </li>
                                            <li>
                                                Your information will take some
                                                time to download. Instagram will
                                                notify you once your information
                                                is ready via your email.
                                            </li>
                                            <li>
                                                Once your information is ready,
                                                download your ZIP file then
                                                upload it to this site via the{" "}
                                                <strong>Upload</strong> button.
                                            </li>
                                        </ol>
                                    </DialogDescription>
                                </DialogHeader>
                            </ZipForm>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="absolute bottom-5 text-xs flex flex-row justify-center items-center gap-x-2">
                <span>
                    Made with 🧠 by{" "}
                    <ExternalLink url="https://github.com/6xtvo" text="tncz" />
                </span>
                <span>|</span>
                <span className="flex flex-row justify-center items-center gap-x-1">
                    Contact me on{" "}
                    <a href="https://instagram.com/bennn.kee" target="_blank" rel="noopener noreferrer">
                        <Instagram className="mt-0.5 h-5 w-5 hover:brightness-75 cursor-pointer" />
                    </a>
                </span>
            </div>
        </div>
    );
}
