import { BsLaptop } from "react-icons/bs";
import { FiSmartphone } from "react-icons/fi";
import { IconType } from "react-icons/lib";
import {UAParser} from "ua-parser-js";
import {isPast,format,formatDistanceToNowStrict} from "date-fns";

interface SessionInfo {
    deviceType:string;
    browser:string;
    os:string;
    timeAgo:string;
    icon:IconType;
};

export const ParseSession = (
    userAgent:string, 
    createdAt:string
):SessionInfo=>{
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    const deviceType = result.device.type || "Desktop";
    const browser = `${result.browser.name}` || "Web";
    const os = `${result.os.name} ${result.os.version}`;
  
    // Choose an icon based on device type
    const icon = deviceType === "mobile" ? FiSmartphone : BsLaptop;

    // Format expiration information
    const formattedAt = isPast(new Date(createdAt))
    ? `${formatDistanceToNowStrict(new Date(createdAt))} ago`
    : format(new Date(createdAt), "d MMM, yyyy");

    return {
        deviceType,
        browser,
        icon,
        os,
        timeAgo:formattedAt
    }
};