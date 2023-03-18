import React from "react";

export const LoginModalBtn = () => {
    return(
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            로그인
        </button>
    )

}

export const LoginModal = () => {
    return(
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-body">
                    <h4>회원 가입하기</h4>
                    <div>
                        <div>
                            <button>
                                <p>
                                    구글 로그인하기
                                </p>
                            </button>
                        </div>
                        <div>
                            <button>
                                <p>
                                    네이버 로그인하기
                                </p>
                            </button>
                        </div>
                        <div>
                            <button>
                                <p>
                                    깃헙 로그인하기
                                </p>
                            </button>
                        </div>
                        <div>
                            <button>
                                <p>
                                    카카오 로그인하기
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}