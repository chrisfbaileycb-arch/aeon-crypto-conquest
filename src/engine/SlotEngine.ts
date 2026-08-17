export type SymbolId='BTC'|'ETH'|'SOL'|'DOGE'|'SEVEN'|'BELL'|'A'|'K'|'Q'|'WILD'|'SCATTER';
export interface SymbolDef{id:SymbolId;glyph:string;name:string;payouts:Record<number,number>;weight:number;isWild?:boolean;isScatter?:boolean}
export const SYMBOLS:Record<SymbolId,SymbolDef>={
 BTC:{id:'BTC',glyph:'₿',name:'Bitcoin Orb',payouts:{3:30,4:90,5:400},weight:5},ETH:{id:'ETH',glyph:'◆',name:'Ether Prism',payouts:{3:20,4:65,5:250},weight:8},SOL:{id:'SOL',glyph:'≋',name:'Solar Chain',payouts:{3:14,4:40,5:150},weight:12},DOGE:{id:'DOGE',glyph:'Ð',name:'Doge Token',payouts:{3:10,4:25,5:90},weight:16},SEVEN:{id:'SEVEN',glyph:'7',name:'Nova Seven',payouts:{3:8,4:20,5:70},weight:20},BELL:{id:'BELL',glyph:'♢',name:'Aeon Bell',payouts:{3:6,4:14,5:45},weight:25},A:{id:'A',glyph:'A',name:'Ace',payouts:{3:4,4:10,5:30},weight:32},K:{id:'K',glyph:'K',name:'King',payouts:{3:3,4:8,5:20},weight:38},Q:{id:'Q',glyph:'Q',name:'Queen',payouts:{3:2,4:6,5:15},weight:44},WILD:{id:'WILD',glyph:'✦',name:'Aeon Wild',payouts:{},weight:7,isWild:true},SCATTER:{id:'SCATTER',glyph:'⌛',name:'Time Gate',payouts:{},weight:5,isScatter:true}};
export const PAYLINES=[[[0,1],[1,1],[2,1],[3,1],[4,1]],[[0,0],[1,0],[2,0],[3,0],[4,0]],[[0,2],[1,2],[2,2],[3,2],[4,2]],[[0,0],[1,1],[2,2],[3,1],[4,0]],[[0,2],[1,1],[2,0],[3,1],[4,2]]] as const;
const weighted=Object.values(SYMBOLS).flatMap(s=>Array(s.weight).fill(s.id)) as SymbolId[];
export interface SpinResult{matrix:SymbolId[][];totalWin:number;lines:number;scatters:number;bonus:boolean}
export function spin(bet:number,rng:()=>number=Math.random):SpinResult{
 const matrix=Array.from({length:3},()=>Array<SymbolId>(5).fill('A'));
 for(let c=0;c<5;c++)for(let r=0;r<3;r++)matrix[r][c]=weighted[Math.floor(rng()*weighted.length)];
 let totalWin=0,lines=0,scatters=matrix.flat().filter(x=>x==='SCATTER').length;
 for(const line of PAYLINES){let match:SymbolId|undefined,count=0;for(const [c,r] of line){const s=matrix[r][c];if(s==='SCATTER')break;if(!match&&s!=='WILD')match=s;if(s==='WILD'||s===match)count++;else break}if(match&&count>=3){totalWin+=(bet/PAYLINES.length)*(SYMBOLS[match].payouts[count]||0);lines++}}
 if(scatters>=3)totalWin+=bet*(scatters===3?5:scatters===4?15:50);
 return{matrix,totalWin:Math.floor(totalWin),lines,scatters,bonus:scatters>=3};
}
