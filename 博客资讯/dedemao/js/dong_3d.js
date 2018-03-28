dMax()
function dMax(){
	var radius = 80;
    var dtr = Math.PI/180;
    var d=160;

var mcList = [];
var active = false;
var lasta = 1;
var lastb = 1;
var distr = true;
var tspeed=8;
var size=200;

var mouseX=0;
var mouseY=0;

var howElliptical=1;

var aMenkey=null;
var oD_Menkey=null;

window.onload=function ()
{
	var i=0;
	var oTag=null;
	var dong=null;
	
	oD_Menkey=document.getElementById('div1');
	
	aMenkey=oD_Menkey.getElementsByTagName('a');
	
	for(i=0;i<aMenkey.length;i++)
	{
		oTag={};
		
		oTag.offsetWidth=aMenkey[i].offsetWidth;
		oTag.offsetHeight=aMenkey[i].offsetHeight;
		
		mcList.push(oTag);
	}
	
	sineCosine( 0,0,0 );
	
	positionAll();
	dong_move()
	function dong_move(){
	      dong =setInterval(update, 30);
	}
	
	oD_Menkey.onmouseover=function ()
	{
		clearInterval(dong)
	};
	
	oD_Menkey.onmouseout=function ()
	{
		dong_move()
	};
	
	/*oD_Menkey.onmouseover=function ()
	{
		active=true;
	};
	
	oD_Menkey.onmouseout=function ()
	{
		active=false;
	};
	
	oD_Menkey.onmousemove=function (ev)
	{
		var oEvent=window.event || ev;
		
		mouseX=oEvent.clientX-(oD_Menkey.offsetLeft+oD_Menkey.offsetWidth/2);
		mouseY=oEvent.clientY-(oD_Menkey.offsetTop+oD_Menkey.offsetHeight/2);
		
		mouseX/=8;
		mouseY/=8;
	};*/
};

function update()
{
	var a;
	var b;
	
	if(active)
	{
		a = (-Math.min( Math.max( -mouseY, -size ), size ) / radius ) * tspeed;
		b = (Math.min( Math.max( -mouseX, -size ), size ) / radius ) * tspeed;
	}
	else
	{
		a = lasta * 1;
		b = lastb * 1;
	}
	
	lasta=a;
	lastb=b;
	
	if(Math.abs(a)<=0.01 && Math.abs(b)<=0.01)
	{
		return;
	}
	
	var c=0;
	sineCosine(a,b,c);
	for(var j=0;j<mcList.length;j++)
	{
		var rx1=mcList[j].cx;
		var ry1=mcList[j].cy*ca+mcList[j].cz*(-sa);
		var rz1=mcList[j].cy*sa+mcList[j].cz*ca;
		
		var rx2=rx1*cb+rz1*sb;
		var ry2=ry1;
		var rz2=rx1*(-sb)+rz1*cb;
		
		var rx3=rx2*cc+ry2*(-sc);
		var ry3=rx2*sc+ry2*cc;
		var rz3=rz2;
		
		mcList[j].cx=rx3;
		mcList[j].cy=ry3;
		mcList[j].cz=rz3;
		
		per=d/(d+rz3);
		
		mcList[j].x=(howElliptical*rx3*per)-(howElliptical*2);
		mcList[j].y=ry3*per;
		mcList[j].scale=per;
		mcList[j].alpha=per;
		mcList[j].alpha=(mcList[j].alpha-0.6)*(10/6);
	}
	
	doPosition();
	depthSort();
}

function depthSort()
{
	var i=0;
	var aTmp=[];
	
	for(i=0;i<aMenkey.length;i++)
	{
		aTmp.push(aMenkey[i]);
	}
	
	aTmp.sort
	(
		function (vItem1, vItem2)
		{
			if(vItem1.cz>vItem2.cz)
			{
				return -1;
			}
			else if(vItem1.cz<vItem2.cz)
			{
				return 1;
			}
			else
			{
				return 0;
			}
		}
	);
	
	for(i=0;i<aTmp.length;i++)
	{
		aTmp[i].style.zIndex=i;
	}
}

function positionAll()
{
	var phi=0;
	var theta=0;
	var max=mcList.length;
	var i=0;
	
	var aTmp=[];
	var oFragment=document.createDocumentFragment();
	
	//随机排序
	for(i=0;i<aMenkey.length;i++)
	{
		aTmp.push(aMenkey[i]);
	}
	
	aTmp.sort
	(
		function ()
		{
			return Math.random()<0.5?1:-1;
		}
	);
	
	for(i=0;i<aTmp.length;i++)
	{
		oFragment.appendChild(aTmp[i]);
	}
	
	oD_Menkey.appendChild(oFragment);
	
	for( var i=1; i<max+1; i++){
		if( distr )
		{
			phi = Math.acos(-1+(2*i-1)/max);
			theta = Math.sqrt(max*Math.PI)*phi;
		}
		else
		{
			phi = Math.random()*(Math.PI);
			theta = Math.random()*(2*Math.PI);
		}
		//坐标变换
		mcList[i-1].cx = radius * Math.cos(theta)*Math.sin(phi);
		mcList[i-1].cy = radius * Math.sin(theta)*Math.sin(phi);
		mcList[i-1].cz = radius * Math.cos(phi);
		
		aMenkey[i-1].style.left=mcList[i-1].cx+oD_Menkey.offsetWidth/2-mcList[i-1].offsetWidth/2+'px';
		aMenkey[i-1].style.top=mcList[i-1].cy+oD_Menkey.offsetHeight/2-mcList[i-1].offsetHeight/2+'px';
	}
}

function doPosition()
{
	var l=oD_Menkey.offsetWidth/2;
	var t=oD_Menkey.offsetHeight/2;
	for(var i=0;i<mcList.length;i++)
	{
		aMenkey[i].style.left=mcList[i].cx+l-mcList[i].offsetWidth/2+'px';
		aMenkey[i].style.top=mcList[i].cy+t-mcList[i].offsetHeight/2+'px';
		aMenkey[i].style.fontSize=Math.ceil(10*mcList[i].scale/2)+10+'px';
		/*写*/
		aMenkey[i].style.filter="alpha(opacity="+100*mcList[i].alpha+")";
		
		aMenkey[i].style.opacity=mcList[i].alpha;
		
	}
}

function sineCosine( a, b, c)
{
	sa = Math.sin(a * dtr);
	ca = Math.cos(a * dtr);
	sb = Math.sin(b * dtr);
	cb = Math.cos(b * dtr);
	sc = Math.sin(c * dtr);
	cc = Math.cos(c * dtr);
}
}