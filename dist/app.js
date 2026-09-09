const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const gm = (q) => 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q);
const directions = (from,to,mode='driving',via=[]) => 'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(from)+'&destination='+encodeURIComponent(to)+'&travelmode='+mode+(via.length?'&waypoints='+encodeURIComponent(via.join('|')):'');
const apple = (q,mode='d')=>'https://maps.apple.com/?daddr='+encodeURIComponent(q)+'&dirflg='+mode;
const link=(label,url)=>`<a target="_blank" rel="noopener" href="${esc(url)}">${esc(label)} ↗</a>`;
const navLinks=(q)=>link('Google 地图',gm(q))+link('Apple 导航',apple(q));
const sources=[
 ['费城景点开放时间 · NPS','https://www.nps.gov/inde/planyourvisit/hours.htm'],
 ['自由钟 · NPS','https://www.nps.gov/inde/planyourvisit/libertybellcenter.htm'],
 ['独立宫预约 · Recreation.gov','https://www.recreation.gov/ticket/facility/234639'],
 ['Reading Terminal Market','https://readingterminalmarket.org/visit-us/'],
 ['市场停车优惠','https://readingterminalmarket.org/directions-parking/'],
 ['费城老城停车','https://www.phlvisitorcenter.com/autopark'],
 ['巴尔的摩停车 · 旅游局','https://baltimore.org/plan/transportation/find-a-place-to-park-in-baltimore/'],
 ['Fell’s Point · 旅游局','https://baltimore.org/neighborhoods/fells-point/'],
 ['自然历史馆 · Smithsonian','https://naturalhistory.si.edu/visit'],
 ['航空航天馆预约','https://airandspace.si.edu/visit/museum-dc'],
 ['林肯纪念堂 · NPS','https://www.nps.gov/linc/planyourvisit/index.htm'],
 ['白宫外观与区域公告','https://www.nps.gov/whho/planyourvisit/viewing-the-white-house.htm'],
 ['DC Metro 支付与路线','https://www.wmata.com/pay.html'],
 ['National Mall 交通','https://www.nps.gov/nama/planyourvisit/directions.htm'],
 ['照片：Ad Meskens / Wikimedia Commons（原图，署名许可）','https://commons.wikimedia.org/wiki/File:Lincoln_reflecting_pond2.jpg']
];
const days=[{kicker:'DAY 01 / THURSDAY',title:'两次短停，一场 DC 夜景',desc:'06:00 出门是这条路线成立的关键。费城和海港只浅逛，别再加水族馆或长时间室内游。',stops:[
 {time:'06:00',city:'法拉盛 → 费城',tag:'驾驶预留 2.5–3.5h',title:'从家出发，先到费城老城',text:'先把导航起点改成家。总体走新泽西南下、经费城与巴尔的摩到 DC；桥隧、I-95 / NJ Turnpike 的具体选择交给当天导航。先吃早餐、加好油，避免一路赶时间。',tip:'导航至车库而非景点正门：AutoPark at Independence Mall，41 N 6th St。',q:'AutoPark at Independence Mall 41 N 6th St Philadelphia',url:sources[5][1]},
 {time:'09:00',city:'费城 · Old City',tag:'必去 · 75 分钟',title:'自由钟 + 独立宫外观',text:'这两处连着逛最顺：自由钟中心免费、无需票但要安检，当前常规开放 09:00–17:00；独立宫主线只拍外观。游客中心可以先上洗手间。排队超过约 20 分钟就缩短参观。',tip:'想进独立宫：当前 09:00–09:50 为免票 open house，10:00 起常规讲解需预约。不要把“早到”当作一定能进入；进入会挤占后续时间。',q:'Liberty Bell Philadelphia',url:sources[0][1]},
 {time:'10:20',city:'费城 · 早午餐',tag:'约 70 分钟含转场',title:'Reading Terminal Market 吃一圈',text:'从老城步行约 20–25 分钟，吃早午餐再返回取车；主线不二次挪车。市场常规 08:00–18:00，商户各自营业时间可能不同。看现场菜单挑 cheesesteak、三明治或甜点。',tip:'11:30 左右取车离开。想悠闲吃满一小时，就把巴尔的摩缩短或跳过。市场停车优惠仅适用于指定车库，不适用于老城车库。',q:'Reading Terminal Market 1136 Arch St Philadelphia',url:sources[3][1]},
 {time:'11:30',city:'费城 → 巴尔的摩',tag:'驾驶预留 2–2.5h',title:'往海港开，留一点堵车弹性',text:'此段目标 14:00 左右抵达内港；如中途需要休息，先休息，别为了准时抵达硬开。进入城中心还需时间停车。',tip:'如果 14:30 仍没到内港，建议直接去 DC；导航里删除巴尔的摩停靠点。',q:'Inner Harbor Baltimore'},
 {time:'14:00',city:'巴尔的摩 · Inner Harbor',tag:'可跳过 · 约 1 小时',title:'内港散步，喝杯咖啡',text:'把这里当作中途伸展腿脚的一站：海边步道、船与城市天际线。选内港附近车库，计入找车位和取车时间。水族馆不放入这次主线，避免短停变半日游。',tip:'更喜欢小店街区：用 Fell’s Point 替换内港，不要两边都逛。雷雨时直接跳过露天海港。',q:'Inner Harbor Baltimore',url:sources[6][1]},
 {time:'15:00',city:'巴尔的摩 → DC',tag:'驾驶预留 1.5–2.5h',title:'到酒店停好车，缓一缓',text:'目标 16:30–17:30 抵达 DC，但下午进城可能更慢。办理入住、补水、休息后再出门；酒店区域优先 Downtown / Penn Quarter。住宿尚未预订。',tip:'订房前确认一晚停车费用，以及周五退房后能否继续停车到 14:00 左右。',q:'Penn Quarter Washington DC'},
 {time:'18:00',city:'DC · 晚餐',tag:'约 60–90 分钟',title:'酒店附近吃饭，或去 The Wharf',text:'如果已经累了，就在酒店附近吃。还有精神再到 The Wharf 吃晚餐、看水边；餐厅现场等位可能打乱安排，出发前看菜单和可订时段。驾驶人不饮酒。',tip:'The Wharf 是替代晚餐区域，不是必须打卡；别为了赶夜景吃得太匆忙。',q:'The Wharf Washington DC'},
 {time:'19:30',city:'DC · National Mall',tag:'重点 · 60–90 分钟',title:'林肯纪念堂 + 倒影池夜景',text:'到林肯纪念堂看向倒影池与华盛顿纪念碑，步行一小段即可，不必穿越整片草坪。纪念堂主厅与外部免费、常规全天开放；洗手间、博物馆与电梯晚间会关闭。',tip:'主线不包含需票的 Undercroft 体验。天气不好就取消夜景，把林肯纪念堂移到周五早晨并跳过白宫。',q:'Lincoln Memorial Washington DC',url:sources[10][1]}
]},{kicker:'DAY 02 / FRIDAY',title:'DC 精华，留力气开回纽约',desc:'只选一个大博物馆。14:30 左右返程是建议目标，不是保证避开所有高峰；晚上到家时间随路况变化。',stops:[
 {time:'08:30',city:'DC · 白宫外观',tag:'可调整 · 30 分钟',title:'白宫外面拍照，不安排内部参观',text:'在允许通行的公共区域看白宫外观；具体可达位置以当天围栏、警戒与 NPS 公告为准。白宫内部参观需要事先申请，不是买张票就能进。',tip:'9 月 11 日出行，临时活动和警戒需当天核对；这里不代表已确认任何封路。若昨晚下雨，改去林肯纪念堂。',q:'White House Washington DC',url:sources[11][1]},
 {time:'09:15',city:'DC · National Mall',tag:'约 30 分钟',title:'华盛顿纪念碑外观',text:'看纪念碑与草坪轴线，拍完照往自然历史馆方向走。这里仅安排外观，不包含登塔预约。若晨间绕去林肯纪念堂，可省略这一站。',tip:'白宫到纪念碑、纪念碑到博物馆分别按约 15–25 分钟步行预留；慢走或遇到封闭就打车、少去一站。',q:'Washington Monument Washington DC'},
 {time:'10:00',city:'DC · 博物馆',tag:'必去 · 约 2 小时',title:'自然历史博物馆',text:'恐龙、宝石和自然世界，适合轻松逛一个上午。免费，无需入场预约；当前常规开放 10:00–17:30。安检排队也计入这两小时，不追求把所有展厅看完。',tip:'想看飞机与太空：用航空航天馆替换，需免费定时入场票。选 10:00 附近场次；未拿到合适票就保留自然历史馆。',q:'Smithsonian National Museum of Natural History Washington DC',url:sources[8][1]},
 {time:'12:15',city:'DC · 午餐',tag:'约 1 小时',title:'Penn Quarter 吃饭、坐一会儿',text:'在博物馆北侧区域吃午餐，留体力给长途返程。别临时加一间大博物馆；如果上午已经很累，吃完就去取行李和车。',tip:'午饭和行李地点跟酒店位置联动；不建议为了特定餐厅横穿城市。',q:'Penn Quarter Washington DC'},
 {time:'13:15',city:'DC · 弹性时间',tag:'可跳过 · 最多 30 分钟',title:'国会大厦外观，或直接返程准备',text:'还有余力且路况允许，打车到国会大厦外部拍照，再回酒店。只看外观，不安排内部参观；如果取行李、取车不顺路，就跳过。',tip:'13:45 前结束最后一站，留出至少 45 分钟取行李、取车和出城准备。',q:'United States Capitol Washington DC'},
 {time:'14:30',city:'DC → 法拉盛',tag:'驾驶含休息预留 5.5–7.5h',title:'回纽约，预计 20:00–22:00 到家',text:'返程不再安排费城和巴尔的摩游览。用实时导航选路，中途休息和吃东西；事故、天气或周五拥堵都可能让抵达更晚。',tip:'出现困倦就停止驾驶、到安全地点休息，必要时增加一晚住宿。不要把预计到家时间当作必须完成的任务。',q:'Flushing Queens NY',url:directions('Washington DC','Flushing Queens NY')}
]}];
function renderDay(n){const d=days[n];$('#day-kicker').textContent=d.kicker;$('#day-title').textContent=d.title;$('#day-desc').textContent=d.desc;$('#timeline').innerHTML=d.stops.map(s=>`<article class="stop"><div class="time">${s.time}</div><div class="stopcard"><span class="tag">${s.city}</span><span class="tag ${s.tag.includes('必去')||s.tag.includes('重点')?'highlight':''}">${s.tag}</span><h3>${s.title}</h3><p>${s.text}</p><p class="muted">${s.tip}</p><div class="links">${navLinks(s.q)}${s.url?link('查看详情',s.url):''}</div></div></article>`).join('');document.querySelectorAll('[data-day]').forEach(b=>{b.classList.toggle('selected',Number(b.dataset.day)===n);b.setAttribute('aria-pressed',String(Number(b.dataset.day)===n))});}
document.querySelectorAll('[data-day]').forEach(b=>b.addEventListener('click',()=>renderDay(Number(b.dataset.day))));
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.panel').forEach(p=>p.hidden=p.id!==b.dataset.tab);document.querySelectorAll('[data-tab]').forEach(x=>x.setAttribute('aria-selected',String(x===b)));}));
$('#full-route').href=directions('Flushing Queens NY','Washington DC','driving',['Philadelphia PA','Baltimore MD']);
$('#map-city').addEventListener('change',e=>{$('#map-frame').src='https://maps.google.com/maps?q='+encodeURIComponent(e.target.value)+'&output=embed';});
const routes=[
 ['01 / 去程完整路线','法拉盛 → 费城 → 巴尔的摩 → DC','含城市停靠点；出发前将起点改成家、终点改成酒店。',directions('Flushing Queens NY','Washington DC','driving',['Philadelphia PA','Baltimore MD'])],
 ['02 / 费城步行','老城车库 → 自由钟 → 市场 → 车库','约 3–4 公里规划量，含去市场与返回；不含展馆内走路。',directions('AutoPark at Independence Mall Philadelphia','AutoPark at Independence Mall Philadelphia','walking',['Liberty Bell Philadelphia','Reading Terminal Market Philadelphia'])],
 ['03 / 巴尔的摩短停','内港周边停车搜索','先确认营业时间、预约时段、取车方式；不要默认找到搜索结果就有车位。',gm('parking garage Inner Harbor Baltimore')],
 ['04 / DC 夜景步行','林肯纪念堂 → 倒影池 → 二战纪念碑','单程约 1 公里；短线只走倒影池的一部分也很好。',directions('Lincoln Memorial Washington DC','World War II Memorial Washington DC','walking',['Lincoln Memorial Reflecting Pool'])],
 ['05 / DC 市区交通','Metro 路线与服务公告','市区建议停车一次，步行 + 地铁 / 打车组合；先看当日服务提醒。','https://www.wmata.com/'],
 ['06 / 返程直达','DC → 法拉盛','不加入途经城市游览；出发前查看实时交通和预计抵达。',directions('Washington DC','Flushing Queens NY')]
];
$('#route-cards').innerHTML=routes.map(r=>`<article class="card"><p class="eyebrow">${r[0]}</p><h3>${r[1]}</h3><p>${r[2]}</p><div class="links">${link('打开路线 / 地图',r[3])}</div></article>`).join('');
const alternatives=[
 ['费城 · 历史迷','独立宫内部','用内部参观替换市场慢逛。10:00 起常规讲解需要预约，当前每张票收 $1 手续费；未检查具体余票。','Independence Hall Philadelphia',sources[2][1]],
 ['巴尔的摩 · 小店街区','Fell’s Point','用它替换内港：水边餐厅、街道与小店，更适合边走边逛。只能选一个街区，不叠加。','Fells Point Baltimore',sources[7][1]],
 ['DC · 航空航天迷','国家航空航天博物馆','替换自然历史馆，免费定时入场票必须先预约。认准 Washington, DC 馆，不是弗吉尼亚 Udvar-Hazy 馆。','National Air and Space Museum Washington DC',sources[9][1]]
];
$('#alternatives').innerHTML=alternatives.map(a=>`<article class="card"><p class="eyebrow">${a[0]}</p><h3>${a[1]}</h3><p>${a[2]}</p><div class="links">${link('官方信息 / 预约',a[4])}${link('地图',gm(a[3]))}</div></article>`).join('');
const weather=[
 {city:'费城',en:'PHILADELPHIA',high:[31,28],low:[21,16],f:['88 / 71°F','82 / 61°F'],desc:['局部晴朗，偏热；可能有雷雨','大致晴朗，湿度降低'],lat:39.95,lon:-75.16},
 {city:'巴尔的摩',en:'BALTIMORE',high:[32,28],low:[20,17],f:['90 / 68°F','82 / 63°F'],desc:['晴间多云，闷热；可能有雷雨','大致晴朗，湿度降低'],lat:39.29,lon:-76.61},
 {city:'华盛顿 DC',en:'WASHINGTON',high:[33,29],low:[21,17],f:['91 / 69°F','84 / 62°F'],desc:['晴间多云，闷热；可能有雷雨','大致晴朗，湿度降低'],lat:38.90,lon:-77.04}
];
$('#weather-cards').innerHTML=weather.map(w=>`<article class="card"><p class="eyebrow">${w.en}</p><h3>${w.city}</h3>${[0,1].map(i=>`<div class="forecast-day"><p>${i?'周五 9/11':'周四 9/10'}</p><div class="temps">${w.high[i]}° <small>/ ${w.low[i]}°C</small></div><p class="muted">最高 / 最低 · ${w.f[i]}</p><p>${w.desc[i]}</p></div>`).join('')}<div class="links">${link('查看 NWS 最新天气',`https://forecast.weather.gov/MapClick.php?lat=${w.lat}&lon=${w.lon}`)}</div></article>`).join('');
const driving=[
 ['费城停车','主线选 AutoPark at Independence Mall，41 N 6th St，官网列为 24 小时车库；未查当天价格和车位。停一次再步行。若只去市场，可看市场指定停车优惠，但注意 2 小时限制和验证要求。',sources[5][1],'老城停车官方信息'],
 ['巴尔的摩停车','内港短停优先附近收费车库；旅游局有停车预订入口。价格会随时段和活动变化，提前比较并核对步行距离。贵重物品随身带走，座位上不要留包。',sources[6][1],'内港停车入口'],
 ['DC 停车','酒店或商业车库停一次，再步行、Metro 或打车。Smithsonian 在 National Mall 没有面向公众的专用停车场；不要以为博物馆门口能免费停一天。',sources[8][1],'博物馆交通信息'],
 ['DC 地铁怎么付','Metro Rail 支持 SmarTrip 或非接触支付，进站和出站使用同一张卡或同一设备。手机钱包和实体卡别混用；每人独立支付介质更省事。具体票价查官方行程规划。',sources[12][1],'Metro 支付说明'],
 ['过路费与导航','带好 E-ZPass 并检查余额和车牌信息。过桥、收费高速、隧道的金额取决于路线与付款方式，这里不编一个固定总价。出发前查看导航收费提示；不要为省过路费接受明显更疲劳的路线。',directions('Flushing Queens NY','Washington DC'),'查看实时路线'],
 ['路边停车要核对','收费不等于允许停一整天。现场逐项看时段、时长、清扫、施工与临时禁停标志；不确定就用商业车库。预约停车还要确认是否可进出、是否超时收费和车库限高。',sources[13][1],'DC 交通官方建议']
];
$('#drive-cards').innerHTML=driving.map(d=>`<article class="card"><h3>${d[0]}</h3><p>${d[1]}</p><div class="links">${link(d[3],d[2])}</div></article>`).join('');
const packs=[['证件与车',['驾照、车辆登记、保险凭证','E-ZPass 与余额检查','信用卡 + 少量现金','检查油量 / 充电量、胎压、雨刷','车充、充电线、手机支架','下载沿途离线地图、收藏酒店车库']],['随身与天气',['舒服的步行鞋、替换袜子','防晒霜、帽子、太阳镜','小雨伞或轻便雨衣','水瓶、补水饮料、小零食','薄外套、1 套换洗衣物','充电宝、常用药、纸巾']],['出发前最后检查',['订好 9/10 住宿并确认停车','确认退房后停车 / 行李寄存','若选航空航天馆：保存预约票','查看当日天气、封路与景点公告','小包装随身；不带刀具和胡椒喷雾入馆','记录车库位置、入口和取车截止时间']]];
let checked={};try{checked=JSON.parse(localStorage.getItem('aq-dc-packing-v1')||'{}')||{};if(typeof checked!=='object')checked={};}catch{checked={};}
$('#checklist').innerHTML=packs.map((p,i)=>`<article class="card"><h3>${p[0]}</h3>${p[1].map((s,j)=>`<label class="check"><input type="checkbox" data-pack="${i}-${j}" ${checked[`${i}-${j}`]?'checked':''}><span>${s}</span></label>`).join('')}</article>`).join('');
function updateCount(){const total=document.querySelectorAll('[data-pack]').length;const count=document.querySelectorAll('[data-pack]:checked').length;$('#pack-count').textContent=`${count} / ${total} 已准备`;$('#pack-progress').max=total;$('#pack-progress').value=count;}
document.querySelectorAll('[data-pack]').forEach(c=>c.addEventListener('change',()=>{checked[c.dataset.pack]=c.checked;try{localStorage.setItem('aq-dc-packing-v1',JSON.stringify(checked));}catch{}updateCount();}));
$('#sources').innerHTML=sources.map(s=>link(s[0],s[1])).join('');
const photo=document.createElement('img');photo.src='dc-photo.jpg';photo.alt='林肯纪念堂、倒影池与二战纪念碑，摄影 Ad Meskens';photo.width=3559;photo.height=1360;Object.assign(photo.style,{position:'absolute',width:'100%',height:'100%',objectFit:'cover',objectPosition:'center'});$('#photocard').prepend(photo);
renderDay(0);updateCount();
