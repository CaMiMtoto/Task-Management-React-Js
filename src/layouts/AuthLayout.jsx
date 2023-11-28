import {Outlet} from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-vh-100 tw-grid lg:tw-grid-cols-2 ">
            <div className="bg-primary  h-100 tw-relative">
                <div className="tw-absolute  tw-top-1/3 tw-left-20  text-white">
                    <h1 className="">
                        Task Management
                    </h1>
                    <p className="">
                        Manage your tasks easily, efficiently and effectively
                    </p>
                </div>
            </div>
            <div className="align-self-center">
                <div className="xl:tw-p-44 tw-p-8">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}