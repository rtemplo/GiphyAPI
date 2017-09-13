// JavaScript Document
'use strict';
let limit = 20;
let buttonArr = [];

function renderButton(btnText) {
	$("#button-layer").append($('<button class="btn btn-sm btn-info btn-giphy">'+ btnText +'</button>'));
}

function getGiphys () {
	let queryURL = "https://api.giphy.com//v1/gifs/search?api_key=568ac25997f94bc8869f84d3cf37ad02&q=" + $(this).html() + "&limit=" + limit + "&rating=g";

	$.ajax({
	  url: queryURL,
	  method: "GET"
	}).done(function (response) {
		renderGiphys(response);
	});

}

function renderGiphys(response) {
	$("#result-container").empty();

	$.map(response.data, function (carddata) {
		let imageID = carddata.id;
		let stillImg = carddata.images.original_still.url;
		let animatedImg = carddata.images.downsized_large.url;
		let url = carddata.url; //currently unused, may use for full launch link via id
		let imagecard = $("#original-giphy-card").clone().removeAttr("id");

		imagecard.find("img").attr("src", stillImg);
		imagecard.find("img").attr("data-animsrc", animatedImg);
		imagecard.find(".card-block").html('<a href="'+url+'" target="_blank">' + imageID + "</a>");
		imagecard.appendTo("#result-container");
	});
}

function swapSrc() {
	let src1 = $(this).attr("src");
	let src2 = $(this).attr("data-animsrc");

	$(this).attr("src", src2);
	$(this).attr("data-animsrc", src1);
}

$(document).ready(function () {
	$("#button-layer").empty();
	$("#result-container").empty();

	$("#add-button").on("click", function(event) {
		let btnText = $("#search-term").val().trim();
		if (btnText !== "" && btnText !== undefined) {
			if (buttonArr.indexOf(btnText.toLowerCase()) === -1) {
				buttonArr.push(btnText.toLowerCase());
				renderButton(btnText);
			} else {
				let msg = 'This button has already been added: ' + btnText;
				console.log(msg);
				alert(msg);
			}
		}
		event.preventDefault();
	});

	$(document).on("click", ".btn-giphy", getGiphys);		

	$(document).on("click", ".giphy-src", swapSrc);

});