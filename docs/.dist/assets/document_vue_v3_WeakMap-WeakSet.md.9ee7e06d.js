import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.f5532599.js";const u=JSON.parse('{"title":"WeakMap-WeakSet","description":"","frontmatter":{"title":"WeakMap-WeakSet","isTimeLine":true,"date":"2022-03-02T15:20:23.000Z"},"headers":[],"relativePath":"document/vue/v3/WeakMap-WeakSet.md","filePath":"document/vue/v3/WeakMap-WeakSet.md"}'),p={name:"document/vue/v3/WeakMap-WeakSet.md"},o=l(`<h3 id="weakmap" tabindex="-1">WeakMap <a class="header-anchor" href="#weakmap" aria-label="Permalink to &quot;WeakMap&quot;">​</a></h3><ul><li>WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。</li><li>WeakMap 它不会阻止垃圾回收机制对作为键的对象（key object）的回收</li><li>WeakMap 和 Map 的第一个不同点就是，WeakMap 的键必须是对象，不能是原始值</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> user </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { name: </span><span style="color:#9ECBFF;">&#39;John&#39;</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> map </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Map</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">map.</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(user, </span><span style="color:#9ECBFF;">&#39;...&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// user取消了引用， 但是{ name: &quot;John&quot; }不会被回收</span></span>
<span class="line"><span style="color:#6A737D;">// 因为它还被map引用， 我们可以使用 map.keys() 来获取它</span></span>
<span class="line"><span style="color:#E1E4E8;">user </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> user </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { name: </span><span style="color:#032F62;">&#39;John&#39;</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> map </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Map</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">map.</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(user, </span><span style="color:#032F62;">&#39;...&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// user取消了引用， 但是{ name: &quot;John&quot; }不会被回收</span></span>
<span class="line"><span style="color:#6A737D;">// 因为它还被map引用， 我们可以使用 map.keys() 来获取它</span></span>
<span class="line"><span style="color:#24292E;">user </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span></span></code></pre></div><ul><li>WeakMap 在这方面有着根本上的不同。它不会阻止垃圾回收机制对作为键的对象（key object）的回收。</li><li>而Map是强引用，会阻止垃圾回收</li><li>我们来看下面的例子</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> user </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { name: </span><span style="color:#9ECBFF;">&#39;John&#39;</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> wk </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WeakMap</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">wk.</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(user, </span><span style="color:#9ECBFF;">&#39;...&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">user </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 取消引用 稍候会从内存中回收user</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> user </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { name: </span><span style="color:#032F62;">&#39;John&#39;</span><span style="color:#24292E;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> wk </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WeakMap</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">wk.</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(user, </span><span style="color:#032F62;">&#39;...&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">user </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 取消引用 稍候会从内存中回收user</span></span></code></pre></div><h4 id="example" tabindex="-1">example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;example&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> wk </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WeakMap</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> div </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;div&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  wk.</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(div, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    div </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;div 取消了引用&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, </span><span style="color:#79B8FF;">2000</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">setInterval</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(wk)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> wk </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WeakMap</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> div </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;div&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  wk.</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(div, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    div </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;div 取消了引用&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  }, </span><span style="color:#005CC5;">2000</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">setInterval</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(wk)</span></span>
<span class="line"><span style="color:#24292E;">  }, </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6F42C1;">run</span><span style="color:#24292E;">()</span></span></code></pre></div><ul><li>WeakMap 不支持迭代以及 keys()，values() 和 entries() 方法。所以没有办法获取 WeakMap 的所有键或值。</li><li>WeakMap 没有 size， 因为不知道什么时候对象就被回收了，所以无法记录</li><li>WeakMap 只有以下的方法： <ul><li>weakMap.get(key)</li><li>weakMap.set(key, value)</li><li>weakMap.delete(key)</li><li>weakMap.has(key)</li></ul></li></ul><h3 id="weakset" tabindex="-1">WeakSet <a class="header-anchor" href="#weakset" aria-label="Permalink to &quot;WeakSet&quot;">​</a></h3><ul><li>WeakSet 的表现类似：</li><li>与 Set 类似，但是我们只能向 WeakSet 添加对象（而不能是原始值）。</li><li>对象只有在其它某个（些）地方能被访问的时候，才能留在 set 中。</li><li>跟 Set 一样，WeakSet 支持 add，has 和 delete 方法，但不支持 size 和 keys()，并且不可迭代。</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ws</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WeakSet</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> user </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { name: </span><span style="color:#9ECBFF;">&#39;Pete&#39;</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">ws.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(user)</span></span>
<span class="line"><span style="color:#E1E4E8;">ws.</span><span style="color:#B392F0;">has</span><span style="color:#E1E4E8;">(user) </span><span style="color:#6A737D;">// true</span></span>
<span class="line"><span style="color:#E1E4E8;">user </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 取消引用 稍候会从内存中回收user</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ws</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WeakSet</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> user </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { name: </span><span style="color:#032F62;">&#39;Pete&#39;</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">ws.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(user)</span></span>
<span class="line"><span style="color:#24292E;">ws.</span><span style="color:#6F42C1;">has</span><span style="color:#24292E;">(user) </span><span style="color:#6A737D;">// true</span></span>
<span class="line"><span style="color:#24292E;">user </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 取消引用 稍候会从内存中回收user</span></span></code></pre></div><h3 id="example-1" tabindex="-1">Example <a class="header-anchor" href="#example-1" aria-label="Permalink to &quot;Example&quot;">​</a></h3><ul><li>检测一个闭包变量，是否被垃圾机制回收了</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ws</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WeakSet</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">wrapper</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">fn</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { desc: </span><span style="color:#9ECBFF;">&#39;我是data&#39;</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ws.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(data)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      data.a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">(data)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">runner</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">wrapper</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    data.b </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  ws.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(runner)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">runner</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">setInterval</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(ws)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ws</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WeakSet</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">wrapper</span><span style="color:#24292E;">(</span><span style="color:#E36209;">fn</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { desc: </span><span style="color:#032F62;">&#39;我是data&#39;</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">    ws.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(data)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      data.a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">(data)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">runner</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">wrapper</span><span style="color:#24292E;">((</span><span style="color:#E36209;">data</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    data.b </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  ws.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(runner)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">runner</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">setInterval</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(ws)</span></span>
<span class="line"><span style="color:#24292E;">  }, </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6F42C1;">init</span><span style="color:#24292E;">()</span></span></code></pre></div><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><ul><li><p>WeakMap 是类似于 Map 的集合，它仅允许对象作为键，并且一旦通过其他方式无法访问它们，便会将它们与其关联值一同删除。</p></li><li><p>WeakSet 是类似于 Set 的集合，它仅存储对象，并且一旦通过其他方式无法访问它们，便会将其删除。</p></li><li><p>它们的主要优点是它们对对象是弱引用，所以被它们引用的对象很容易地被垃圾收集器移除。</p></li><li><p>这是以不支持 clear、size、keys、values 等作为代价换来的……</p></li><li><p>WeakMap 和 WeakSet 被用作“主要”对象存储之外的“辅助”数据结构。一旦将对象从主存储器中删除，如果该对象仅被用作 WeakMap 或 WeakSet 的键，那么它将被自动清除。</p></li></ul>`,16),e=[o];function t(c,r,E,y,i,F){return a(),n("div",null,e)}const k=s(p,[["render",t]]);export{u as __pageData,k as default};
