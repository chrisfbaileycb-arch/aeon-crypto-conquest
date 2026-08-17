export type Plan='FREE'|'VIP';
export interface Economy{balance:number;vault:number;plan:Plan;spentToday:number;day:string;lastClaim:string;adCredits:number;totalSpins:number;bestWin:number}
export const LIMITS={FREE:5000,VIP:15000} as const;
const key='AEON_ECONOMY_V1'; const today=()=>new Date().toISOString().slice(0,10);
export const initialState=():Economy=>({balance:10000,vault:0,plan:'FREE',spentToday:0,day:today(),lastClaim:'',adCredits:0,totalSpins:0,bestWin:0});
export function load():Economy{try{return{...initialState(),...JSON.parse(localStorage.getItem(key)||'{}')}}catch{return initialState()}}
export function normalize(s:Economy):Economy{return s.day===today()?s:{...s,day:today(),spentToday:0,adCredits:0}}
export function save(s:Economy){localStorage.setItem(key,JSON.stringify(s))}
export function remaining(s:Economy){return LIMITS[s.plan]+s.adCredits-s.spentToday}
export function canSpin(s:Economy,bet:number){return s.balance>=bet&&remaining(s)>=bet}
export function wager(s:Economy,bet:number):Economy{return{...s,balance:s.balance-bet,vault:Math.min(5000,s.vault+Math.floor(bet*.08)),spentToday:s.spentToday+bet,totalSpins:s.totalSpins+1}}
export function award(s:Economy,win:number):Economy{return{...s,balance:s.balance+win,bestWin:Math.max(s.bestWin,win)}}
