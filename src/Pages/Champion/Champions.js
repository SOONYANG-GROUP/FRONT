import React, { useEffect, useState } from "react";

import { FieldLists } from "../../Components/Constants/Lists";

const Champions = () => {
    const [ isLoading, setIsLoading ] = useState(true);


    return(
        <div>



<div class="container-fluid">

		<div class="row">
			<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">카드 제목</h5>
						<p class="card-text">카드 내용</p>
					</div>
				</div>
			</div>
			<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">카드 제목</h5>
						<p class="card-text">카드 내용</p>
					</div>
				</div>
			</div>
			<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">카드 제목</h5>
						<p class="card-text">카드 내용</p>
					</div>
				</div>
			</div>
			<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">카드 제목</h5>
						<p class="card-text">카드 내용</p>
					</div>
				</div>
			</div>
			<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">카드 제목</h5>
						<p class="card-text">카드 내용</p>
					</div>
				</div>
			</div>
		</div>
	</div>


        </div>
    )    
}

export default Champions;