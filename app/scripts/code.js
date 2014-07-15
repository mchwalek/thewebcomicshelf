$(document).ready(function() {
	theWebcomicShelf.init();
});

var theWebcomicShelf = {
	init: function() {
		this.updateAddBtnState();
		this.initLocalStorageDetection();
		this.initComicSelector();
		this.initComicsSelectorWrapper();
		this.initSortableComicsList();
		this.initAddComicButton();
		this.initDeleteComicButton();
		this.initUserComics();
	},

	initLocalStorageDetection: function() {
		if(!this.isLocalStorageSupported()) {
			$('#errorContainer').css('display', 'table');
		}
	},

	initComicSelector: function() {
		$("#comicsSelector").val($("#comicsSelector option:first").val());

		$("#comicsSelector").change(function() {
			theWebcomicShelf.updateAddBtnState();
		});
	},

	initComicsSelectorWrapper: function() {
		$(document).click(function() {
			$("#comicsSelectorWrapper ul:visible").hide();
		})

		$("#comicsSelectorWrapper #chooseComicBtn").click(function(event) {
			$("#comicsSelectorWrapper ul").toggle();
			event.stopPropagation();
		});

		$("#comicsSelectorWrapper ul li").click(function(event) {
			$("#comicsSelector").val($(event.target).closest('li').data("value")).change();
			$("#comicsSelectorWrapper #chooseComicBtn span.btnContent").text($(event.target).closest('li').text());
		});
	},

	initSortableComicsList: function() {
		$("#comicsList").sortable({
			handle: ".header",
			stop: function(event, ui) {
				$("#comicsList").css("height", "auto");
				ui.item.children(".comicContainer").children(".comic").show();

				userComics = [];

				$("#comicsList li").each(function() {
					userComics.push($(this).attr("id"));
				});

				localStorage['userComics'] = JSON.stringify(userComics);
			}
		});

		$("#comicsList").on("mousedown", ".header", function(event) {
			if(event.which == 1) {
				$("#comicsList").css("height", $("#comicsList").outerHeight(true));
				$(this).closest("li").children(".comicContainer").children(".comic").hide();
			}
		});

		$("#comicsList").on("mouseup", ".header", function() {
			$("#comicsList").css("height", "auto");
			$(this).closest("li").children(".comicContainer").children(".comic").show();
		});

		
	},

	initAddComicButton: function() {
		var userComics = this.getUserComics();
		$("#addComicBtn").click(function() {
			$("#addComicBtn").hide();
			$("#comicAddedBtn").show();

			var comicId = $("#comicsSelector").val();
			var comicName = $("#comicsSelector").children(":selected").text();

			var placeholder = $("#placeholder").clone();
			placeholder.attr("id", comicId);
			placeholder.find('.header h2').text(comicName);
			$("#comicsList").append(placeholder);

			userComics.push(comicId);
			localStorage['userComics'] = JSON.stringify(userComics);

			$.ajax({
				url: "comic/" + comicId,
				dataType: "html"
			})
			.done(function(response) {
				$("#comicsList #" + comicId).html(response);
			});
		});
	},

	initDeleteComicButton: function() {
		$("#comicsList").on("click", ".deleteComicBtn", function() {
			var deletedId = $(this).closest("li").attr("id");
			$(this).closest("li").remove();

			userComics = [];

			$("#comicsList li").each(function() {
				userComics.push($(this).attr("id"));
			});

			localStorage['userComics'] = JSON.stringify(userComics);

			if($("#comicsSelector").val() == deletedId) {
				$("#comicAddedBtn").hide();
				$("#addComicBtn").show();
			}
		});
	},

	getUserComics: function() {
		if(typeof(localStorage["userComics"]) !== "undefined") {
			return JSON.parse(localStorage["userComics"]);
		}
		else {
			return [];
		}
	},

	updateAddBtnState: function() {
		var userComics = this.getUserComics();
		var comicId = $("#comicsSelector").val();

		if($.inArray(comicId, userComics) !== -1) {
			$("#addComicBtn").hide();
			$("#comicAddedBtn").show();
		}
		else {
			$("#addComicBtn").show();
			$("#comicAddedBtn").hide();
		}
	},

	initUserComics: function() {
		var userComics = this.getUserComics();

		for(var i = 0; i < userComics.length; i++) {
			var comicId = userComics[i];
			var comicName = $("#comicsSelector").children("[value="+ comicId +"]").text();

			(function(id) {
				var placeholder = $("#placeholder").clone();
				placeholder.attr("id", id)
				placeholder.find('.header h2').text(comicName);
				$("#comicsList").append(placeholder);

				$.ajax({
					url: "comic/" + id,
					dataType: "html"
				})
				.done(function(response) {
					$("#comicsList #" + id).html(response);
				});
			})(comicId);
		}
	},

	isLocalStorageSupported: function() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}
}