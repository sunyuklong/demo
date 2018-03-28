<?php
$z[0]=Array("field","",255,274);
$z[0][4]['name']="title";
$z[1]=Array("global","",275,301);
$z[1][4]['name']="cfg_webname";
$z[2]=Array("field","",342,371);
$z[2][4]['name']="keywords";
$z[3]=Array("field","",411,469);
$z[3][4]['name']="description";
$z[3][4]['function']="html2text(@me)";
$z[4]=Array("include","",1495,1530);
$z[4][4]['filename']="head.htm";
$z[5]=Array("type","[field:typename /]",1675,1716);
$z[6]=Array("list","\r\n                                                                <div class=\"post\">\r\n                            <div class=\"content\">\r\n                                <div class=\"art_img\">\r\n                                    <a href=\"[field:arcurl/]\" rel=\"bookmark\">\r\n                                        <img src=\"[field:litpic/]\" alt=\"[field:fulltitle/]\" />\r\n                                    </a>\r\n                                </div>\r\n                                <div class=\"art_right\">\r\n                                    <h4><a href=\"[field:arcurl/]\" rel=\"bookmark\">[field:fulltitle/]</a></h4>\r\n                                    <div class=\"postmeta\">\r\n                                        <a href=\"#\">[field:writer/]</a><span label=\"dynamic_load_tag\" field=\"inputtime\" recordid=\"5269\" class=\"left_author_span\">[field:pubdate function=\"GetDateTimeMK(@me)\"/]</span>&nbsp;<em class=\"tag\"><span class='left_tag_span'>[field:id function=GetTags(@me)/]</span></em>\r\n                                    </div>\r\n                                    <p class=\"summary\">[field:description function='cn_substr(@me,130)'/]...<a rel=\"bookmark\" href=\"[field:arcurl/]\"></a>\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n    \r\n    ",1793,3176);
$z[6][4]['pagesize']="10";
$z[7]=Array("pagelist","",3263,3341);
$z[7][4]['listitem']="info,index,end,pre,next,pageno,option";
$z[7][4]['listsize']="5";
$z[8]=Array("include","",3926,3962);
$z[8][4]['filename']="right.htm";
$z[9]=Array("include","",5097,5134);
$z[9][4]['filename']="footer.htm";

?>