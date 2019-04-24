import Pica from 'pica';

const pica = Pica();

export function compressImage(img, config={}, log=false) {
	var canvas = document.createElement('canvas');
    var resizedCanvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var mockImg = new Image;

	var promise = new Promise((resolve,reject) => {
		mockImg.onload = () => {
	        if(log){
	        	console.log('the image is drawn on the canvas for optimisation');
	        }
	        resizedCanvas.height = mockImg.naturalHeight
	        resizedCanvas.width = mockImg.naturalWidth
	        canvas.height = mockImg.naturalHeight
	        canvas.width = mockImg.naturalWidth
	        ctx.drawImage(mockImg,0,0);
	        var options = {
	            quality : ((config.quality)?config.quality:2),
	            unsharpAmount: 80,
	            unsharpRadius: 0.6,
	            unsharpThreshold: 2
	        }
	        pica.resize(mockImg, resizedCanvas, options).then((result) => {
	            if(log){
	            	console.log('result',result);
	            }
	            pica.toBlob(result, 'image/jpeg', ((config.jpegQuality)?config.jpegQuality:0.90)).then((processedImage)=>{
	            	resolve(processedImage,result)
	            })
	        })
	    }
	    if(log){
	    	console.log('image being uploaded on canvas',file);
	    }
	    mockImg.src = URL.createObjectURL(img);
	});
	return promise;
}