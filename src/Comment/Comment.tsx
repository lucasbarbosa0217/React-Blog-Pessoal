import styles from "./comment.module.css";
import {formatDistanceToNow, parseISO} from "date-fns";
import {ptBR} from "date-fns/locale";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


export default function Comment({comment}) {
    const [relativeTime, setRelativeTime] = useState("");


    const navigate = useNavigate();

    useEffect(() => {
        if (comment) {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const date = parseISO(comment.updatedTimestamp + "Z");
            const localDate = new Date(date.toLocaleString("en-US", {timeZone}));
            const relative = formatDistanceToNow(localDate, {
                addSuffix: true,
                locale: ptBR,
            });
            setRelativeTime(relative);
        }
    }, [comment]);

    return (
        <div className={styles.main}>
            <div className={styles.userDetailComment}>
                <div className={styles.user}>
                    <img src={comment.user.photo}></img>
                    <div className={styles.commentDescription}>
                        <p>{comment.user.name}</p>
                        <p className={styles.time}>Disse {relativeTime}:</p>
                    </div>


                </div>
                <span className="material-symbols-outlined">menu
                    </span>

            </div>
            <div className={styles.commentText}>{comment.text}</div>
        </div>
    );
}
