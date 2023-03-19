import React from "react";

export const LoginModalBtn = () => {
    return(
        <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            로그인
        </button>
        <LoginModal />
        </>
    )

}

const LoginModal = () => {
    return(
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-body">
                    <h4 className="text-center">로그인 하기</h4>
                    <div>
                        <div>
                            <button className="w-100 mb-3 btn btn-primary">
                                <span className="fs-5"><i className="fa-brands fa-google"></i> 구글 로그인하기</span>
                            </button>
                        </div>
                        <div>
                            <button className="w-100 mb-3 btn btn-success">
                                <span className="fs-5"><i className="fa-solid fa-n"></i> 네이버 로그인하기</span>
                            </button>
                        </div>
                        <div>
                            <button className="w-100 mb-3 btn btn-dark">
                                <span className="fs-5"><i className="fa-brands fa-github"></i> 깃헙 로그인하기</span>
                            </button>
                        </div>
                        <div>
                            <button className="w-100 btn btn btn-warning">
                                <span className="fs-5"><i className="fa-solid fa-comment"></i> 카카오 로그인하기</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}