// JavaScript Document
$(document).ready(function(){
	var fileHide = false;var fileSrc;
	$('#post-upload').hide();
	$('#file-hide').hide();
	$('#form').submit(function(e){
		e.preventDefault();
		var msg = $('#message').val();
		if(fileHide==true){
			encrypt(fileSrc)
			return;
		}
		if(msg=="")
		return;
		else
		encrypt(msg);
		});
		
		$('#encrypt').click(function(){
			if(fileHide==true){
			encrypt(fileSrc);
			return;
		}
			var msg = $('#message').val();
		if(msg=="")
			alertify("<i class='icon-exclamation-sign'></i>&nbsp;&nbsp;Message field is empty!");
		else
		encrypt(msg);
			});
	
		$('#decrypt').click(function(){decrypt()});
		$('#browse').on('click', function(){
			$('#upload').trigger('click');
										});

		$('#select_secret_file').click(function(){
			$('#hide_file').trigger('click');
		})
										
			
				var dnd = document.getElementById('dnd');						
	function handleFileSelect(evt)
{
	var target = $(event.target).attr('id');
	evt.stopPropagation();
    evt.preventDefault();
		if(evt.dataTransfer)
    var files = evt.dataTransfer.files ;
	else if(evt.target)
	var files = evt.target.files ;
	
    var output = files[0];
	this.style.boxShadow = 'none';
	
	if (!output.type.match('image.*')&&target=='upload') {
        alert("Unsupported File Format");
		return false;
      }
	  
	
	
	var reader = new FileReader();
	reader.onload = (function(thefile)
	{
		return function(e)
		{
			

			if(target=="hide_file"){
				var ico;
				fileHide = true;

				fileSrc = e.target.result;
				if(output.type.match('image.*'))
			ico = 'icon-picture';
			else if(output.type.match('audio.*'))
				ico = 'icon-headphones';
			else if(output.type.match('video.*'))
				ico = 'icon-film';
			else
				ico = 'icon-file';

			$('#file_icon').addClass(ico);
			$('#file_name').text(output.name);
			$('#file_size').text(output.size+' bytes');
			$('#file-hide').show();
			$('.a').hide();
		}
			else{
				var img = document.createElement('img');
				//<-------		
			img.src = e.target.result;
			var imge = document.getElementById('image');
			img.setAttribute('id','thumb');
			$('#thumb').remove();
			imge.appendChild(img);
				}
			//<--------
			
			
			
			$('#browse').hide();
			$('#post-upload').show(250);//<------- 
		};
	})(output);
	
	 reader.readAsDataURL(output);
}
										
	function handleDragEnter(evt) {
		evt.stopPropagation();
		evt.preventDefault();
   
  }
  
   function handleDragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy';
		this.style.boxShadow = 'inset 2px 2px 10px 1px #ff730c, inset -2px -2px 10px 1px #ff730c';
	
	//i.className = i.className + " icon-2x";
  }
  
  function handleDragEnd(evt){
	  evt.stopPropagation();
   	  evt.preventDefault();	
  }
  
  function handleDragLeave(evt){
	    evt.stopPropagation();
    	evt.preventDefault();
		
		this.style.borxShadow = 'none';
		
  }									

	
  	dnd.addEventListener('dragenter',handleDragEnter,false);
    dnd.addEventListener('dragover', handleDragOver, false); 
	dnd.addEventListener('dragleave', handleDragLeave, false);
  	dnd.addEventListener('drop', handleFileSelect, false);
	dnd.addEventListener('dragend', handleDragEnd, false);
	
	var inp = document.getElementById('upload');
	inp.addEventListener('change', handleFileSelect, false);

	var hid = document.getElementById('hide_file');
	hid.addEventListener('change', handleFileSelect, false);
	
	function encrypt(msg){
		
		console.log(msg);
		//$('.icon-lock').removeClass('icon-class').addClass('icon-spinner').addClass('icon-spin');
		var H,W;
		var src = document.getElementById('thumb').getAttribute('src');
		var myImage =document.createElement('img');
		myImage.src = src;
		
			 H =myImage.height;
	         W =myImage.width;
			
		
		
		
		var canvas = document.createElement('canvas');
		canvas.height = H;
		canvas.width = W;
		var ctx = canvas.getContext('2d');
		
		ctx.drawImage(myImage, 0, 0, W, H);
	var pixels = ctx.getImageData(0, 0, W, H);
	var colordata = pixels.data;
	
	//alert('encryption : '+colordata[colordata.length-5]);
	
	var i,j;
	var x = Math.floor(Math.random() * (10 - 5)) + 5;
	//setting up the alpha levels for last 5 pixels 255-x|235|240|245|250|255
	for(i=1;i<=6;i++){
		if(i==6)
		colordata[colordata.length-(4*i-3)] = 255-x;
		else
		colordata[colordata.length-(4*i-3)] = 255-(5*(i-1));
	}
	//alert('encryption : '+colordata[colordata.length-9]);
	
	//random number generatorr ; between 5 and 10;
	
	var len = msg.length;
	
	i = 4*W+4;
	
	//main encryption loop
	for(j=0;j<len+1;j++)
	{
		if(j==len)
		var ascii = 128; //end of message marked by ascii code 128
		else
		var ascii = msg.charCodeAt(j);
		
		i+=3;
		var avg = getAverage(i, colordata, W);
		if(avg<=200)
				colordata[i]=avg+ascii;
				else
				colordata[i] = avg-ascii;
		
		//alert('encrypting: '+msg[j]+': '+ascii);
		
		/*for(k=0;k<4;k++){
		var avg = getAverage(i, colordata, W);
		if(k==3){
					if(avg<=200)
				colordata[i]=avg+ascii;
				else
				colordata[i] = avg-ascii;
				if(k==3)
			alert('encrypting: '+msg[j]+': '+ascii+" avg value for alpha: "+avg+" ascii left : "+ascii+" colordata["+i+"] : "+colordata[i]);
		}
		else{
				if(ascii<=30){
					if(avg<=200)
					colordata[i]=avg+ascii;
					else
					colordata[i] = avg-ascii;
							}
				else{
								if(avg<=200)
						colordata[i]=avg+30;
						else
						colordata[i] = avg-30;
				ascii-=30;
					}
			
			}
			i++;
		}*/
			i++;
			console.log(i+" ("+pix(i)+")");
			if(W-(pix(i)%W)<=(x+1))
			{
					console.log('changing line to :'+(pix(i)/W));
				i = (Math.ceil(pix(i)/W)+2)*W*4+4;
			
				}
				else
				i = i+(4*(x-1));
			
			
	}
	
	
		ctx.putImageData(pixels, 0, 0);
		var result = canvas.toDataURL();
		$('#thumb').hide('slow').attr('src', result).show('slow');

		
		alertify("<i class='icon-check'></i>&nbsp;&nbsp;Encryption successful! Right-click on the image to download.");
		
		//alert('encryption complete');
		
	}//encrypt()
	
	function decrypt()
	{
		//alert('decrypting');
		var H,W;
		var src = document.getElementById('thumb').getAttribute('src');
		var myImage =document.createElement('img');
		myImage.src = src;
		
			 H =myImage.height;
	         W =myImage.width;
			
		
		
		
		var canvas = document.createElement('canvas');
		canvas.height = H;
		canvas.width = W;
		var ctx = canvas.getContext('2d');
		
		ctx.drawImage(myImage, 0, 0, W, H);
	var pixels = ctx.getImageData(0, 0, W, H);
	var colordata = pixels.data;
	var i,j;
	
	var msg="";
	var x = 255-colordata[colordata.length-21];
		
	if(is_encrypted(colordata)){
			//alert('voila! testing passed!');
			var i;var k;
			i = 4*W+4;
			var avg, currChar;
			var decrypting = true;
			while(decrypting){
				 currChar = 0;
				 i+=3;
				 avg = getAverage(i, colordata, W);
				 currChar=Math.abs(colordata[i]-avg);
					/*for(k=0;k<4;k++){
		 avg = getAverage(i, colordata, W);
					currChar+=Math.abs(colordata[i]-avg);
					
					if(k==3)
					alert("average : "+avg+" ascii left : "+(colordata[i]-avg)+" colordata["+i+"] : "+colordata[i]);
					i++;
					}*/
					
					if(currChar==128){
						if(msg.indexOf('data')!=0)
						alertify("<i class='icon-align-right'></i>&nbsp;&nbsp;"+msg);
					else
						alertify("<a href="+msg+" download id='dload'><i class='icon-download'></i>&nbsp;&nbsp;Download the file</a>");
					decrypting = false;}
					else{
						//alert(currChar);
							msg+=String.fromCharCode(currChar);
							console.log(i+" ("+pix(i)+") : "+msg);
						}
						
						i++;
						if(W-(pix(i)%W)<=(x+1))
			{
					i = (Math.ceil(pix(i)/W)+2)*W*4+4;
				console.log("moving to next line");
				}
				else
				i = i+(4*(x-1));
						
				}
			
		}
	else{
		alertify('<i class="icon-exclamation-sign"></i>&nbsp;&nbsp;The given image does not contain any message!');return false;
		}
		
	}
	
	
	
	function is_encrypted(colordata){
		var i;
			for(i=1;i<=5;i++){
		if(colordata[colordata.length-(4*i-3)]!=255-(5*(i-1)))
		{return false;}}
		return true;
		}
	

	function pix(i){//pixel count for a given 1
		return Math.floor((i/4))+1;
	}
	
	function getAverage(i, colordata, W){
		return Math.floor((colordata[i-4]+colordata[i+4]+colordata[i+4*W]+colordata[i-4*W])/4);
	}
	
	function alertify(myMsg)
	{
		$('#dash').html(myMsg);
		
	}
	
	
						});