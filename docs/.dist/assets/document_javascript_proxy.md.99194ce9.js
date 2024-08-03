import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.bb8e4904.js";const d=JSON.parse('{"title":"proxy的使用方法","description":"","frontmatter":{"title":"proxy的使用方法","isTimeLine":true,"date":"2021-08-13T14:03:48.000Z"},"headers":[],"relativePath":"document/javascript/proxy.md","filePath":"document/javascript/proxy.md"}'),p={name:"document/javascript/proxy.md"},o=l(`<h3 id="handlers-get" tabindex="-1">handlers.get <a class="header-anchor" href="#handlers-get" aria-label="Permalink to &quot;handlers.get&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">animal</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  dog: </span><span style="color:#9ECBFF;">&#39;dog&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  cat: </span><span style="color:#9ECBFF;">&#39;cat&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  tiger: </span><span style="color:#9ECBFF;">&#39;tiger&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  snake: </span><span style="color:#9ECBFF;">&#39;snake&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">handlers</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">property</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">receiver</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(receiver </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> window.myProxy) </span><span style="color:#6A737D;">// true</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> target[property]</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">proxy</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(animal, handlers)</span></span>
<span class="line"><span style="color:#E1E4E8;">window.myProxy </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> proxy</span></span>
<span class="line"><span style="color:#E1E4E8;">proxy.dog</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">animal</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  dog: </span><span style="color:#032F62;">&#39;dog&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  cat: </span><span style="color:#032F62;">&#39;cat&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  tiger: </span><span style="color:#032F62;">&#39;tiger&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  snake: </span><span style="color:#032F62;">&#39;snake&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">handlers</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">property</span><span style="color:#24292E;">, </span><span style="color:#E36209;">receiver</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(receiver </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> window.myProxy) </span><span style="color:#6A737D;">// true</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> target[property]</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">proxy</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(animal, handlers)</span></span>
<span class="line"><span style="color:#24292E;">window.myProxy </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> proxy</span></span>
<span class="line"><span style="color:#24292E;">proxy.dog</span></span></code></pre></div><h3 id="handlers-set" tabindex="-1">handlers.set <a class="header-anchor" href="#handlers-set" aria-label="Permalink to &quot;handlers.set&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">animal</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  dog: </span><span style="color:#9ECBFF;">&#39;dog&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  cat: </span><span style="color:#9ECBFF;">&#39;cat&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  tiger: </span><span style="color:#9ECBFF;">&#39;tiger&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  snake: </span><span style="color:#9ECBFF;">&#39;snake&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  live: </span><span style="color:#9ECBFF;">&#39;shenzhen&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  from: </span><span style="color:#9ECBFF;">&#39;china&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  school: </span><span style="color:#9ECBFF;">&#39;beida&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  name: </span><span style="color:#9ECBFF;">&#39;black&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  age: </span><span style="color:#79B8FF;">18</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">handlers</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">property</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">receiver</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//receiver 可能是 animal person</span></span>
<span class="line"><span style="color:#E1E4E8;">    target[property] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> value</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">proxy1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(animal, handlers)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">proxy2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(person, handlers)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">animal</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  dog: </span><span style="color:#032F62;">&#39;dog&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  cat: </span><span style="color:#032F62;">&#39;cat&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  tiger: </span><span style="color:#032F62;">&#39;tiger&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  snake: </span><span style="color:#032F62;">&#39;snake&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  live: </span><span style="color:#032F62;">&#39;shenzhen&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  from: </span><span style="color:#032F62;">&#39;china&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  school: </span><span style="color:#032F62;">&#39;beida&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  name: </span><span style="color:#032F62;">&#39;black&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  age: </span><span style="color:#005CC5;">18</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">handlers</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">property</span><span style="color:#24292E;">, </span><span style="color:#E36209;">value</span><span style="color:#24292E;">, </span><span style="color:#E36209;">receiver</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//receiver 可能是 animal person</span></span>
<span class="line"><span style="color:#24292E;">    target[property] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> value</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">proxy1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(animal, handlers)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">proxy2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(person, handlers)</span></span></code></pre></div><h3 id="handlers-defineproperty" tabindex="-1">handlers.defineProperty <a class="header-anchor" href="#handlers-defineproperty" aria-label="Permalink to &quot;handlers.defineProperty&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">animal</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  dog: </span><span style="color:#9ECBFF;">&#39;dog&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  cat: </span><span style="color:#9ECBFF;">&#39;cat&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  tiger: </span><span style="color:#9ECBFF;">&#39;tiger&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  snake: </span><span style="color:#9ECBFF;">&#39;snake&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">handlers</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">defineProperty</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">property</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">descriptor</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(target, property, descriptor)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">proxy1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(animal, handlers)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//下面新增的属性均可拦截</span></span>
<span class="line"><span style="color:#E1E4E8;">Reflect.</span><span style="color:#B392F0;">defineProperty</span><span style="color:#E1E4E8;">(proxy1, </span><span style="color:#9ECBFF;">&#39;bird&#39;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  value: </span><span style="color:#9ECBFF;">&#39;bird&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  configurable: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  enumerable: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  writable: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">Object.</span><span style="color:#B392F0;">defineProperty</span><span style="color:#E1E4E8;">(proxy1, </span><span style="color:#9ECBFF;">&#39;panda&#39;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  vlaue: </span><span style="color:#9ECBFF;">&#39;panda&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  configurable: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  enumerable: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  writable: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">animal</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  dog: </span><span style="color:#032F62;">&#39;dog&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  cat: </span><span style="color:#032F62;">&#39;cat&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  tiger: </span><span style="color:#032F62;">&#39;tiger&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  snake: </span><span style="color:#032F62;">&#39;snake&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">handlers</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">defineProperty</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">property</span><span style="color:#24292E;">, </span><span style="color:#E36209;">descriptor</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(target, property, descriptor)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">proxy1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(animal, handlers)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//下面新增的属性均可拦截</span></span>
<span class="line"><span style="color:#24292E;">Reflect.</span><span style="color:#6F42C1;">defineProperty</span><span style="color:#24292E;">(proxy1, </span><span style="color:#032F62;">&#39;bird&#39;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">  value: </span><span style="color:#032F62;">&#39;bird&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  configurable: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  enumerable: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  writable: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">Object.</span><span style="color:#6F42C1;">defineProperty</span><span style="color:#24292E;">(proxy1, </span><span style="color:#032F62;">&#39;panda&#39;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">  vlaue: </span><span style="color:#032F62;">&#39;panda&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  configurable: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  enumerable: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  writable: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h3 id="handlers-deleteproperty-删除拦截" tabindex="-1">handlers.deleteProperty 删除拦截 <a class="header-anchor" href="#handlers-deleteproperty-删除拦截" aria-label="Permalink to &quot;handlers.deleteProperty 删除拦截&quot;">​</a></h3><ul><li>拦截如下操作</li><li>delete obj.foo delete obj.foo.bar</li><li>Reflect.deleteProperty(obj, &#39;foo&#39;)</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">animal</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  dog: </span><span style="color:#9ECBFF;">&#39;dog&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  cat: </span><span style="color:#9ECBFF;">&#39;cat&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  tiger: </span><span style="color:#9ECBFF;">&#39;tiger&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  snake: </span><span style="color:#9ECBFF;">&#39;snake&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">handlers</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">deleteProperty</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">property</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(property </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;dog&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">delete</span><span style="color:#E1E4E8;"> target[property] </span><span style="color:#6A737D;">// 这里才是真正删除</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;property removed：&#39;</span><span style="color:#E1E4E8;">, property)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`property：\${</span><span style="color:#E1E4E8;">property</span><span style="color:#9ECBFF;">} is readonly.\`</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">proxy1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(animal, handlers)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(proxy1.dog, </span><span style="color:#9ECBFF;">&#39;dog&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> proxy1) </span><span style="color:#6A737D;">// dog true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">delete</span><span style="color:#E1E4E8;"> proxy1.dog </span><span style="color:#6A737D;">// true</span></span>
<span class="line"><span style="color:#F97583;">delete</span><span style="color:#E1E4E8;"> proxy1.cat </span><span style="color:#6A737D;">// false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(proxy1.dog, </span><span style="color:#9ECBFF;">&#39;dog&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> proxy1) </span><span style="color:#6A737D;">// undefined false</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(proxy1) </span><span style="color:#6A737D;">// Proxy{ cat: &#39;cat&#39;, tiger: &#39;tiger&#39;, snake: &#39;snake&#39; }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">animal</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  dog: </span><span style="color:#032F62;">&#39;dog&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  cat: </span><span style="color:#032F62;">&#39;cat&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  tiger: </span><span style="color:#032F62;">&#39;tiger&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  snake: </span><span style="color:#032F62;">&#39;snake&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">handlers</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">deleteProperty</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">property</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(property </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;dog&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">delete</span><span style="color:#24292E;"> target[property] </span><span style="color:#6A737D;">// 这里才是真正删除</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;property removed：&#39;</span><span style="color:#24292E;">, property)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`property：\${</span><span style="color:#24292E;">property</span><span style="color:#032F62;">} is readonly.\`</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">proxy1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(animal, handlers)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(proxy1.dog, </span><span style="color:#032F62;">&#39;dog&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> proxy1) </span><span style="color:#6A737D;">// dog true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">delete</span><span style="color:#24292E;"> proxy1.dog </span><span style="color:#6A737D;">// true</span></span>
<span class="line"><span style="color:#D73A49;">delete</span><span style="color:#24292E;"> proxy1.cat </span><span style="color:#6A737D;">// false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(proxy1.dog, </span><span style="color:#032F62;">&#39;dog&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> proxy1) </span><span style="color:#6A737D;">// undefined false</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(proxy1) </span><span style="color:#6A737D;">// Proxy{ cat: &#39;cat&#39;, tiger: &#39;tiger&#39;, snake: &#39;snake&#39; }</span></span></code></pre></div><h3 id="handlers-getownpropertydescriptor" tabindex="-1">handlers.getOwnPropertyDescriptor <a class="header-anchor" href="#handlers-getownpropertydescriptor" aria-label="Permalink to &quot;handlers.getOwnPropertyDescriptor&quot;">​</a></h3><ul><li>拦截如下操作</li><li>Object.getOwnPropertyDescriptor()</li><li>Reflect.getOwnPropertyDescriptor()</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">animal</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  dog: </span><span style="color:#9ECBFF;">&#39;dog&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  cat: </span><span style="color:#9ECBFF;">&#39;cat&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  tiger: </span><span style="color:#9ECBFF;">&#39;tiger&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  snake: </span><span style="color:#9ECBFF;">&#39;snake&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">handlers</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">getOwnPropertyDescriptor</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">property</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">descriptor</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(property </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> target) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> Reflect.</span><span style="color:#B392F0;">getOwnPropertyDescriptor</span><span style="color:#E1E4E8;">(target, property)</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> { configurable: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, enumerable: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, writable: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, value: </span><span style="color:#9ECBFF;">&#39;black&#39;</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">proxy1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(animal, handlers)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(Object.</span><span style="color:#B392F0;">getOwnPropertyDescriptor</span><span style="color:#E1E4E8;">(proxy1, </span><span style="color:#9ECBFF;">&#39;dog&#39;</span><span style="color:#E1E4E8;">)) </span><span style="color:#6A737D;">// {value: &quot;dog&quot;, writable: true, enumerable: true, configurable: true}</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(Reflect.</span><span style="color:#B392F0;">getOwnPropertyDescriptor</span><span style="color:#E1E4E8;">(proxy1, </span><span style="color:#9ECBFF;">&#39;black&#39;</span><span style="color:#E1E4E8;">)) </span><span style="color:#6A737D;">// {value: &quot;black&quot;, writable: false, enumerable: false, configurable: true}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">animal</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  dog: </span><span style="color:#032F62;">&#39;dog&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  cat: </span><span style="color:#032F62;">&#39;cat&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  tiger: </span><span style="color:#032F62;">&#39;tiger&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  snake: </span><span style="color:#032F62;">&#39;snake&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">handlers</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">getOwnPropertyDescriptor</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">property</span><span style="color:#24292E;">, </span><span style="color:#E36209;">descriptor</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(property </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> target) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> Reflect.</span><span style="color:#6F42C1;">getOwnPropertyDescriptor</span><span style="color:#24292E;">(target, property)</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> { configurable: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, enumerable: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, writable: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, value: </span><span style="color:#032F62;">&#39;black&#39;</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">proxy1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(animal, handlers)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(Object.</span><span style="color:#6F42C1;">getOwnPropertyDescriptor</span><span style="color:#24292E;">(proxy1, </span><span style="color:#032F62;">&#39;dog&#39;</span><span style="color:#24292E;">)) </span><span style="color:#6A737D;">// {value: &quot;dog&quot;, writable: true, enumerable: true, configurable: true}</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(Reflect.</span><span style="color:#6F42C1;">getOwnPropertyDescriptor</span><span style="color:#24292E;">(proxy1, </span><span style="color:#032F62;">&#39;black&#39;</span><span style="color:#24292E;">)) </span><span style="color:#6A737D;">// {value: &quot;black&quot;, writable: false, enumerable: false, configurable: true}</span></span></code></pre></div><h3 id="proxy-中的-receiver" tabindex="-1">Proxy 中的 receiver <a class="header-anchor" href="#proxy-中的-receiver" aria-label="Permalink to &quot;Proxy 中的 receiver&quot;">​</a></h3><ul><li><p>MDN: 如果 target 对象中指定了 getter，receiver 则为 getter 调用时的 this 值。</p></li><li><p>例子 1</p></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  bar: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// MDN: 如果target对象中指定了getter，receiver则为getter调用时的this值。</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.bar</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">handler</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">receiver</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> Reflect.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(target, key, receiver)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(obj, handler)</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(p.foo) </span><span style="color:#6A737D;">// 1</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(Reflect.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(p, </span><span style="color:#9ECBFF;">&#39;foo&#39;</span><span style="color:#E1E4E8;">, { bar: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> })) </span><span style="color:#6A737D;">// 2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  bar: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">get</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// MDN: 如果target对象中指定了getter，receiver则为getter调用时的this值。</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.bar</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">handler</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#E36209;">receiver</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> Reflect.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(target, key, receiver)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">p</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(obj, handler)</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(p.foo) </span><span style="color:#6A737D;">// 1</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(Reflect.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(p, </span><span style="color:#032F62;">&#39;foo&#39;</span><span style="color:#24292E;">, { bar: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> })) </span><span style="color:#6A737D;">// 2</span></span></code></pre></div><ul><li>例子 2</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">user</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  _name: </span><span style="color:#9ECBFF;">&#39;Guest&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">._name</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">userProxy</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(user, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">receiver</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> target[key] </span><span style="color:#6A737D;">// (*) target = user</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// return Reflect.get(target, key, receiver)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">admin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  __proto__: userProxy,</span></span>
<span class="line"><span style="color:#E1E4E8;">  _name: </span><span style="color:#9ECBFF;">&#39;Admin&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 期望输出：Admin 却得到 Guest 如果我们移除代理，那么一切都会按预期进行。</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(admin.name)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 当我们读取 admin.name 时，由于 admin 对象自身没有对应的的属性，搜索将转到其原型。</span></span>
<span class="line"><span style="color:#6A737D;">// 原型是 userProxy。</span></span>
<span class="line"><span style="color:#6A737D;">// 从代理读取 name 属性时，get 捕捉器会被触发，并从原始对象返回 target[key] 属性，在 (*) 行。</span></span>
<span class="line"><span style="color:#6A737D;">// 当调用 target[key] 时，若 key 是一个 getter，它将在 this=target 上下文中运行其代码。</span></span>
<span class="line"><span style="color:#6A737D;">// 因此，结果是来自原始对象 target 的 this._name，即来自 user。</span></span>
<span class="line"><span style="color:#6A737D;">// 为了解决这种情况，我们需要 get 捕捉器的第三个参数 receiver。</span></span>
<span class="line"><span style="color:#6A737D;">// 它保证将正确的 this 传递给 getter。</span></span>
<span class="line"><span style="color:#6A737D;">// 也就是将 target[key] 更改为 Reflect.get(target, key, receiver)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">user</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  _name: </span><span style="color:#032F62;">&#39;Guest&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">get</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">._name</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">userProxy</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(user, {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#E36209;">receiver</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> target[key] </span><span style="color:#6A737D;">// (*) target = user</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// return Reflect.get(target, key, receiver)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">admin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  __proto__: userProxy,</span></span>
<span class="line"><span style="color:#24292E;">  _name: </span><span style="color:#032F62;">&#39;Admin&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 期望输出：Admin 却得到 Guest 如果我们移除代理，那么一切都会按预期进行。</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(admin.name)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 当我们读取 admin.name 时，由于 admin 对象自身没有对应的的属性，搜索将转到其原型。</span></span>
<span class="line"><span style="color:#6A737D;">// 原型是 userProxy。</span></span>
<span class="line"><span style="color:#6A737D;">// 从代理读取 name 属性时，get 捕捉器会被触发，并从原始对象返回 target[key] 属性，在 (*) 行。</span></span>
<span class="line"><span style="color:#6A737D;">// 当调用 target[key] 时，若 key 是一个 getter，它将在 this=target 上下文中运行其代码。</span></span>
<span class="line"><span style="color:#6A737D;">// 因此，结果是来自原始对象 target 的 this._name，即来自 user。</span></span>
<span class="line"><span style="color:#6A737D;">// 为了解决这种情况，我们需要 get 捕捉器的第三个参数 receiver。</span></span>
<span class="line"><span style="color:#6A737D;">// 它保证将正确的 this 传递给 getter。</span></span>
<span class="line"><span style="color:#6A737D;">// 也就是将 target[key] 更改为 Reflect.get(target, key, receiver)</span></span></code></pre></div><ul><li>例子 3</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      bar: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 如果使用get1拦截器， this为target</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 此时this.bar 不会再触发proxy getter拦截器</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 从而导致无法收集bar依赖</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 如果使用get2则不会有上述问题发现，它将会传递正确的this给getter</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 即receiver, 即data，所以此时访问this.bar会再触发getter拦截器</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// bar依赖可以被正常收集</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 当使用get2，又不想收集bar依赖</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 可以使用 toRaw(this).bar 访问</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.bar</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// get1</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(target, key, receiver) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> target[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// get2</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(target, key, receiver) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> Reflect.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(target, key, receiver)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      bar: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">get</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 如果使用get1拦截器， this为target</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 此时this.bar 不会再触发proxy getter拦截器</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 从而导致无法收集bar依赖</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 如果使用get2则不会有上述问题发现，它将会传递正确的this给getter</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 即receiver, 即data，所以此时访问this.bar会再触发getter拦截器</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// bar依赖可以被正常收集</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 当使用get2，又不想收集bar依赖</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 可以使用 toRaw(this).bar 访问</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.bar</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// get1</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(target, key, receiver) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> target[key]</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// get2</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(target, key, receiver) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> Reflect.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(target, key, receiver)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>总结：应使用Reflect.get(target, key, receiver) 避免错误行为发生</li></ul>`,20),e=[o];function r(t,c,E,y,i,F){return n(),a("div",null,e)}const u=s(p,[["render",r]]);export{d as __pageData,u as default};
