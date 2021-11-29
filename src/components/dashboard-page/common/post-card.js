import assignmentIcon from "../../../assets/images/assignment.png";
import announcementIcon from "../../../assets/images/announcement.png";
import FeatherIcon from "feather-icons-react";
import { useState } from "react";

const PostCard = ({ type = "ANNOUNCEMENT", content = "Content" }) => {
    const [attachments, ] = useState(["abcd", "abcd"]);
    
    return (
        <div className="card flex-row p-3 rounded rounded-4 border-0 shadow-md mb-2">
            {/* <div className="">
                <img width="48" height="48" src={type === "ANNOUNCEMENT" ? announcementIcon : assignmentIcon} alt="" />
            </div> */}
            <div className="flex-fill">
                <div className="d-flex align-items-center" style={{ height: "3rem" }}>
                    <img width="48" height="48" src={type === "ANNOUNCEMENT" ? announcementIcon : assignmentIcon} alt="" />
                    <div className="flex-fill ms-3">
                        <h5 className="text-900" style={{ textTransform: "capitalize" }}>
                            {type.toLowerCase()}
                        </h5>
                        <div className="fw-normal text-500 lh-1" style={{ fontSize: "12px" }}>
                            11 May 2021
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        {type === "ASSIGNMENT" && (
                            <span className="me-2 btn-hollow bg-200 px-2 py-1 rounded rounded-3 cursor-pointer">
                            <FeatherIcon width="18" icon="zap"/>
                                <span className="ms-2" style={{ fontSize: "12px" }}>
                                    10 Points
                                </span>
                            </span>
                        )}
                        <div className="btn btn-hollow p-2 rounded rounded-4">
                            <FeatherIcon icon="more-vertical" />
                        </div>
                    </div>
                </div>

                <div className="mt-2 text-500 d-flex">
                    <div className="d-none d-md-block" style={{flex:"0 0 48px"}}></div>
                    <div className="md-0 ms-md-3">
                        {content}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare iaculis aliquam. Quisque nec
                        sapien vitae ipsum facilisis aliquet. Morbi tempus pharetra finibus. Duis at dignissim erat
                    </div>
                </div>
                <div className="mt-2 d-flex align-items-center">
                    <div className="d-none d-md-block" style={{flex:"0 0 48px"}}></div>
                    <div className="flex-fill d-flex ms-0 ms-md-3">
                        {attachments.slice(0, 1).map((attachment) => (
                            <div
                                key={attachment}
                                className="btn-hollow d-block bg-200 px-2 py-1 rounded rounded-3 cursor-pointer text-nowrap"
                                style={{ textOverflow: "ellipsis", maxWidth: "16ch", overflow: "hidden" }}
                            >
                                <FeatherIcon width="18" icon="paperclip" />
                                <span className="w-100 ms-2 text-nowrap">{attachment}</span>
                            </div>
                        ))}
                        {attachments.length > 1 && (
                            <span className="ms-2 btn-hollow bg-200 px-2 py-1 rounded rounded-3 cursor-pointer">
                                <span>{attachments.length - 1} more</span>
                            </span>
                        )}
                    </div>
                    <div>
                        {type === "ASSIGNMENT" && (
                            <span className="ms-2 btn-hollow bg-200 px-2 py-1 rounded rounded-3 cursor-pointer">
                                <FeatherIcon width="18" icon="clock" />
                                <span className="ms-2" style={{ fontSize: "12px" }}>
                                    12 May 11:00 PM
                                </span>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
