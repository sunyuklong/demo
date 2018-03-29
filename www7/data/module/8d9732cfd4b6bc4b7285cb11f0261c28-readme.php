<h1 style="font-size:24px;">本程序更新页面:<a style="font-size:24px;" target="_blank" href="http://www.webyjs.com/archives/203.html">http://www.webyjs.com/archives/203.html</a>
<br/>
作者QQ:676568309
主页：<a style="font-size:24px;" target="_blank" href="http://www.webyjs.com/">http://www.webyjs.com/</a>
</h1>
本插件补足了Dede默认的幻灯片调用方式的不便之处, 可以自由的设置连接, 图片的标题, 以及调整幻灯片顺序, 使用起来极为方便.<br />
以默认模板的幻灯片为例, 演示下如何使用本插件.<br />
在默认的模板中index.htm中找到<br />
{dede:arclist flag='f' row='5'}<br />
linkarr[[field:global.autoindex/]] = "[field:arcurl/]";<br />
picarr[[field:global.autoindex/]]  = "[field:litpic/]";<br />
textarr[[field:global.autoindex/]] = "[field:title function='html2text(@me)'/]";<br />
{/dede:arclist}<br />
替换为, 注意数据库后缀。<br />
{dede:sql sql='SELECT * FROM `#@__flash` WHERE `hidden`=0 ORDER BY `sequence` ASC'}<br />
picarr[[field:global.autoindex/]]  = "[field:img_path/]";<br />
linkarr[[field:global.autoindex/]]  = "[field:link/]";<br />
textarr[[field:global.autoindex/]]  = "[field:alt/]";<br />
{/dede:sql}</p>