import { ReactElement } from "react";

const userInfoComponent = (label: string, value: string | number | ReactElement) => {
    return <section className="user-detail">
        <div>{label}</div>
        <div>{value}</div>
    </section>
}

export default userInfoComponent;