
import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
import { html } from "./dom";

import { ActionHide } from "./components/action-hide";
import { ActionBar } from "./components/action-bar";
import { ActionSaveOrExit } from "./components/action-save-or-exit";
import { SideBar } from "./components/sidebar";
import { Tips } from "./components/tip";
import { ClientId, DosPlayer, DosPlayerOptions } from "./player";
import { LatencyInfo } from "./backend/v7/latency";

import { EmulatorsUi } from "emulators-ui";

import { nanoid } from "nanoid/non-secure";

declare const emulatorsUi: EmulatorsUi;

export type SidebarPage = "main" | "latency-info" | "networking";

const storageKeys = {
    localId: "client.id",
    networkToken: "network.token",
    networkRegion: "network.region",
    uiTips: "ui.tipsV2",
    autolockTips: "ui.autolockTipsV2",
};

export interface Props {
    player: () => DosPlayer;
    options: () => DosPlayerOptions;

    clientId: ClientId | null,
    setClientId: (clientId: ClientId | null) => void,
    requestClientId?: (userGesture: boolean) => Promise<ClientId | null>,

    anonymousClientId: ClientId,

    networkToken: string | null,
    setNetworkToken: (token: string | null) => void,

    mobileControls: boolean;
    setMobileControls: (controls: boolean) => Promise<void>;

    mirroredControls: boolean;
    setMirroredControls: (mirrored: boolean) => Promise<void>;

    autolock: boolean;
    setAutolock: (autolock: boolean) => Promise<void>;

    keyboard: boolean;
    toggleKeyboard: () => void;

    fullscreen: boolean;
    toggleFullscreen: () => void;

    pause: boolean;
    setPause: (pause: boolean) => void;

    mute: boolean;
    setMute: (mute: boolean) => void;

    actionBar: boolean;
    setActionBar: (actionBar: boolean) => void

    sideBar: boolean;
    openSideBar: () => void;
    closeSideBar: () => void;

    region: string | null;
    setRegion: (region: string | null) => void;

    estimatingRegion: string | null;
    setEstimatingRegion: (region: string | null) => void;

    latencyInfo: LatencyInfo | null,
    setLatencyInfo: (latencyInfo: LatencyInfo) => void;

    showTips: boolean;
    setShowTips: (showTips: boolean) => void;

    sideBarPage: SidebarPage;
    setSideBarPage: (page: SidebarPage) => void;

    ipxConnected: boolean;
    setIpxConnected: (ipxConnected: boolean) => void;
}

export function PlayerApp(playerProps: {
    player: () => DosPlayer,
    options: () => DosPlayerOptions,
    setOnRun: (onRun: () => void) => void,
}) {
    const storage = emulatorsUi.dom.storage;
    const requestClientIdFn = playerProps.options().clientId;
    const requestClientId = typeof requestClientIdFn === "function" ?
        (userGesture: boolean) => requestClientIdFn(userGesture) :
        undefined;
    const [clientId, setClientId] = useState<ClientId | null>(null);
    const [sideBar, setSideBar] = useState<boolean>(false);
    const [mobileControls, setMobileControls] = useState<boolean>(playerProps.player().mobileControls);
    const [mirroredControls, setMirroredControls] = useState<boolean>(playerProps.player().mirroredControls);
    const [autolock, setAutolock] = useState<boolean>(playerProps.player().autolock);
    const [keyboard, setKeyboard] = useState<boolean>(playerProps.player().layers.keyboardVisible);
    const [pause, setPause] = useState<boolean>(false);
    const [mute, setMute] = useState<boolean>(false);
    const [fullscreen, setFullscreen] = useState<boolean>(playerProps.player().layers.fullscreen);
    const [actionBar, setActionBar] = useState<boolean>(true);
    const [region, _setRegion] = useState<string | null>(storage.getItem(storageKeys.networkRegion));
    const [estimatingRegion, setEstimatingRegion] = useState<string | null>(null);
    const [showTips, setShowTips] = useState<boolean>(false);
    const [latencyInfo, setLatencyInfo] = useState<LatencyInfo | null>(null);
    const [sideBarPage, setSideBarPage] = useState<SidebarPage>("main");
    const [anonymousClientId] = useState<ClientId>(() => {
        const storedId = storage.getItem(storageKeys.localId);
        const localId = storedId ?? nanoid();
        if (storedId === null) {
            storage.setItem(storageKeys.localId, localId);
        }

        return {
            namespace: encodeURIComponent("local (" + location.href + ")"),
            id: localId,
        };
    });
    const [networkToken, setNetworkToken] = useState<string | null>(storage.getItem(storageKeys.networkToken));
    const [ipxConnected, setIpxConnected] = useState<boolean>(false);

    function setRegion(newRegion: string | null) {
        if (newRegion === region) {
            return;
        }

        if (newRegion !== null) {
            storage.setItem(storageKeys.networkRegion, newRegion);
        }
        _setRegion(newRegion);
        setEstimatingRegion(null);
    }

    useEffect(() => {
        const onTokenRequest = (e: any) => {
            if (e.data.message == "jsdos-get-network-token") {
                e.source?.postMessage({
                    message: "jsdos-network-token",
                    token: networkToken,
                }, "*");
            }
        };

        window.addEventListener("message", onTokenRequest);
        return () => window.removeEventListener("message", onTokenRequest);
    }, [networkToken]);

    useEffect(() => {
        if (typeof requestClientId !== "undefined") {
            requestClientId(false).then(setClientId).catch(console.error);
        }
    }, [requestClientIdFn, setClientId]);

    useEffect(() => {
        playerProps.setOnRun(() => {
            const autolock = playerProps.player().autolock;
            const showTips = storage.getItem(storageKeys.uiTips) !== "false";
            const showTipsAutolok = autolock && storage.getItem(storageKeys.autolockTips) !== "false";
            if (showTips || showTipsAutolok) {
                props.setShowTips(true);
            }
            setAutolock(autolock);
        });

        return () => playerProps.setOnRun(() => {});
    }, [playerProps.setOnRun]);

    useEffect(() => {
        const listener = () => {
            const newFullscreen = document.fullscreenElement !== null;
            setFullscreen(newFullscreen);
            if (!newFullscreen) {
                setActionBar(true);
            }
        };

        document.addEventListener("fullscreenchange", listener);

        return () => {
            document.removeEventListener("fullscreenchange", listener);
        };
    }, [fullscreen, setFullscreen]);

    const setDosPause = (pause: boolean) => {
        playerProps.player().ciPromise?.then((ci) => {
            pause ? ci.pause() : ci.resume();
            setPause(pause);
        }).catch(console.error);
    };

    const props: Props = {
        player: playerProps.player,
        options: playerProps.options,

        clientId,
        setClientId,
        requestClientId,

        anonymousClientId,

        networkToken,
        setNetworkToken: (token: string | null) => {
            token === null ?
                storage.removeItem(storageKeys.networkToken) :
                storage.setItem(storageKeys.networkToken, token);
            setNetworkToken(token);
        },

        mobileControls,
        setMobileControls: async (controls: boolean) => {
            controls ?
                playerProps.player().enableMobileControls() :
                playerProps.player().disableMobileControls();
            setMobileControls(controls);
        },

        mirroredControls,
        setMirroredControls: async (mirrored: boolean) => {
            props.player().setMirroredControls(mirrored);
            setMirroredControls(mirrored);
        },

        autolock,
        setAutolock: async (autolock: boolean) => {
            props.player().setAutolock(autolock);
            setAutolock(autolock);
        },

        keyboard,
        toggleKeyboard: () => {
            setKeyboard(!playerProps.player().layers.keyboardVisible);
            playerProps.player().layers.toggleKeyboard();
        },

        fullscreen,
        toggleFullscreen: () => {
            playerProps.player().layers.toggleFullscreen();
        },

        pause,
        setPause: setDosPause,

        mute,
        setMute: (mute: boolean) => {
            playerProps.player().ciPromise?.then((ci) => {
                mute ? ci.mute() : ci.unmute();
                setMute(mute);
            }).catch(console.error);
        },

        actionBar,
        setActionBar,

        sideBar,
        openSideBar: () => setSideBar(true),
        closeSideBar: () => setSideBar(false),

        region: region,
        setRegion,

        estimatingRegion,
        setEstimatingRegion,

        showTips,
        setShowTips: (newShowTips: boolean) => {
            storage.setItem(storageKeys.uiTips, newShowTips + "");
            if (props.player().autolock) {
                storage.setItem(storageKeys.autolockTips, newShowTips + "");
            }
            setTimeout(() => {
                setDosPause(newShowTips);
                setShowTips(newShowTips);
            }, 500);
        },

        latencyInfo,
        setLatencyInfo,

        sideBarPage,
        setSideBarPage,

        ipxConnected,
        setIpxConnected,
    };

    return html`
    <div class="h-full">
        <${ActionHide} ...${props} />
        <${SideBar} ...${props} />
        <${ActionBar} ...${props} />
        <${ActionSaveOrExit} ...${props} />
        <${Tips} ...${props} />
    </div>
    `;
}

export function createPlayerApp(root: HTMLDivElement,
                                player: DosPlayer,
                                options: DosPlayerOptions,
                                setOnRun: (onRun: () => void) => void) {
    render(html`<${PlayerApp} player=${() => player} options=${() => options} setOnRun=${setOnRun} />`, root);
}
