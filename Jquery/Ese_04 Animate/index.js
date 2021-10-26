$(document).ready(function() {

	let boolClickedBtn = false;
    var _btnAvvia = $("#btnAvvia");
	_btnAvvia.on("click", eseguiAnimazione);
 
	_btnAvvia.css("opacity","0");
	lampeggia();
	function eseguiAnimazione(){ 
		boolClickedBtn = true;
		_btnAvvia.off("click");
		_btnAvvia.css("cursor","default");
		$("#pedina")
		.css({left:"10px",top:"260px", width:"15px", height:"15px"})
		.animate({left:'+=60px', width:"8px", height:"8px"},'1300')
		.animate({top:'+=38px',  width:"15px", height:"15px"},'1300')
		.animate({left:'+=116px',width:"8px", height:"8px"},'1300')
		.animate({top:'+=77px',  width:"15px", height:"15px"}, '1300')
		.animate({left:'+=250px',width:"8px", height:"8px"},'1300',function(){
			boolClickedBtn = false;
			lampeggia();
			_btnAvvia.on("click",eseguiAnimazione);
			_btnAvvia.css("cursor","pointer");
		});
	}
	function lampeggia(){
		let opac = {"opacity" : 1};
		
		_btnAvvia.animate(opac, 450, function(){
			if(boolClickedBtn) return;
			$(this).animate({"opacity":"0"},450, function(){
				if(!boolClickedBtn)
					lampeggia();
			});
		});
	}
});
