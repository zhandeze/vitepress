import{_ as i,c as a,a1 as n,o as t}from"./chunks/framework.CJK9F0vG.js";const E=JSON.parse('{"title":"powershell设置代理","description":"","frontmatter":{"title":"powershell设置代理","isTimeLine":true,"date":"2021-12-24T11:14:39.000Z"},"headers":[],"relativePath":"document/windows/proxy.md","filePath":"document/windows/proxy.md"}'),l={name:"document/windows/proxy.md"};function p(e,s,h,k,r,d){return t(),a("div",null,s[0]||(s[0]=[n(`<h3 id="powershell设置代理" tabindex="-1">powershell设置代理 <a class="header-anchor" href="#powershell设置代理" aria-label="Permalink to &quot;powershell设置代理&quot;">​</a></h3><ul><li>新建~/proxy.ps1文件</li></ul><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">param(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  [Parameter(Mandatory</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$false)]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  [switch]$off</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ($off) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  $env</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">:HTTPS_PROXY</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $null </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  Write-Host</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;取消设置代理成功&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  $env</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">:HTTPS_PROXY</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;http://127.0.0.1:10809&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  Write-Host</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;设置代理成功&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ~</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">roxy.ps1 </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置代理成功</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ~</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">roxy.ps1 -off </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 取消设置代理成功</span></span></code></pre></div>`,4)]))}const c=i(l,[["render",p]]);export{E as __pageData,c as default};