# Preval test case

# arr_spy_op_implicit_x.md

> Normalize > Binary > With > Arr > Arr spy op implicit x
>
> Deal with certain primitive with binary ops

In this variant we tell preval that array is an array with strings
so it will probably end up resolving most of these trivial
cases.
There's also a test where we give preval an array without telling
it the contents (through Array.from).
Also a variation where the array contents is empty or some numbers.

## Options

- globals: x
- loopProtectLimit=1000

## Input

`````js filename=intro
const arr = [
  [$('** operator')] ** x,
  [$('* operator')] * x,
  [$('/ operator')] / x,
  [$('% operator')] % x,
  [$('+ operator')] + x,
  [$('- operator')] - x,
  [$('<< operator')] << x,
  [$('>> operator')] >> x,
  [$('>>> operator')] >>> x,
  [$('< operator')] < x,
  [$('> operator')] > x,
  [$('<= operator')] <= x,
  [$('>= operator')] >= x,
  [$('== operator')] == x,
  [$('!= operator')] != x,
  [$('=== operator')] === x,
  [$('!== operator')] !== x,
  [$('& operator')] & x,
  [$('^ operator')] ^ x,
  [$('| operator')] | x,
];
$(arr);

const arr2 = [
  [$spy('in operator')] in x,
  [$spy('instanceof operator')] instanceof x,
];
$(arr2);
`````


## Settled


`````js filename=intro
const tmpArrElement$39 /*:unknown*/ = $(`** operator`);
const tmpBinLhs /*:array*/ = [tmpArrElement$39];
const tmpArrElement /*:number*/ = tmpBinLhs ** x;
const tmpArrElement$41 /*:unknown*/ = $(`* operator`);
const tmpBinLhs$1 /*:array*/ = [tmpArrElement$41];
const tmpArrElement$1 /*:number*/ = tmpBinLhs$1 * x;
const tmpArrElement$43 /*:unknown*/ = $(`/ operator`);
const tmpBinLhs$3 /*:array*/ = [tmpArrElement$43];
const tmpArrElement$3 /*:number*/ = tmpBinLhs$3 / x;
const tmpArrElement$45 /*:unknown*/ = $(`% operator`);
const tmpBinLhs$5 /*:array*/ = [tmpArrElement$45];
const tmpArrElement$5 /*:number*/ = tmpBinLhs$5 % x;
const tmpArrElement$47 /*:unknown*/ = $(`+ operator`);
const tmpBinLhs$7 /*:array*/ = [tmpArrElement$47];
const tmpArrElement$7 /*:primitive*/ = tmpBinLhs$7 + x;
const tmpArrElement$49 /*:unknown*/ = $(`- operator`);
const tmpBinLhs$9 /*:array*/ = [tmpArrElement$49];
const tmpArrElement$9 /*:number*/ = tmpBinLhs$9 - x;
const tmpArrElement$51 /*:unknown*/ = $(`<< operator`);
const tmpBinLhs$11 /*:array*/ = [tmpArrElement$51];
const tmpArrElement$11 /*:number*/ = tmpBinLhs$11 << x;
const tmpArrElement$53 /*:unknown*/ = $(`>> operator`);
const tmpBinLhs$13 /*:array*/ = [tmpArrElement$53];
const tmpArrElement$13 /*:number*/ = tmpBinLhs$13 >> x;
const tmpArrElement$55 /*:unknown*/ = $(`>>> operator`);
const tmpBinLhs$15 /*:array*/ = [tmpArrElement$55];
const tmpArrElement$15 /*:number*/ = tmpBinLhs$15 >>> x;
const tmpArrElement$57 /*:unknown*/ = $(`< operator`);
const tmpBinLhs$17 /*:array*/ = [tmpArrElement$57];
const tmpArrElement$17 /*:boolean*/ = tmpBinLhs$17 < x;
const tmpArrElement$59 /*:unknown*/ = $(`> operator`);
const tmpBinLhs$19 /*:array*/ = [tmpArrElement$59];
const tmpArrElement$19 /*:boolean*/ = tmpBinLhs$19 > x;
const tmpArrElement$61 /*:unknown*/ = $(`<= operator`);
const tmpBinLhs$21 /*:array*/ = [tmpArrElement$61];
const tmpArrElement$21 /*:boolean*/ = tmpBinLhs$21 <= x;
const tmpArrElement$63 /*:unknown*/ = $(`>= operator`);
const tmpBinLhs$23 /*:array*/ = [tmpArrElement$63];
const tmpArrElement$23 /*:boolean*/ = tmpBinLhs$23 >= x;
const tmpArrElement$65 /*:unknown*/ = $(`== operator`);
const tmpBinLhs$25 /*:array*/ = [tmpArrElement$65];
const tmpArrElement$25 /*:boolean*/ = tmpBinLhs$25 == x;
const tmpArrElement$67 /*:unknown*/ = $(`!= operator`);
const tmpBinLhs$27 /*:array*/ = [tmpArrElement$67];
const tmpArrElement$27 /*:boolean*/ = tmpBinLhs$27 != x;
const tmpArrElement$69 /*:unknown*/ = $(`=== operator`);
const tmpBinLhs$29 /*:array*/ = [tmpArrElement$69];
const tmpArrElement$29 /*:boolean*/ = tmpBinLhs$29 === x;
const tmpArrElement$71 /*:unknown*/ = $(`!== operator`);
const tmpBinLhs$31 /*:array*/ = [tmpArrElement$71];
const tmpArrElement$31 /*:boolean*/ = tmpBinLhs$31 !== x;
const tmpArrElement$73 /*:unknown*/ = $(`& operator`);
const tmpBinLhs$33 /*:array*/ = [tmpArrElement$73];
const tmpArrElement$33 /*:number*/ = tmpBinLhs$33 & x;
const tmpArrElement$75 /*:unknown*/ = $(`^ operator`);
const tmpBinLhs$35 /*:array*/ = [tmpArrElement$75];
const tmpArrElement$35 /*:number*/ = tmpBinLhs$35 ^ x;
const tmpArrElement$77 /*:unknown*/ = $(`| operator`);
const tmpBinLhs$37 /*:array*/ = [tmpArrElement$77];
const tmpArrElement$37 /*:number*/ = tmpBinLhs$37 | x;
const arr /*:array*/ = [
  tmpArrElement,
  tmpArrElement$1,
  tmpArrElement$3,
  tmpArrElement$5,
  tmpArrElement$7,
  tmpArrElement$9,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  tmpArrElement$25,
  tmpArrElement$27,
  tmpArrElement$29,
  tmpArrElement$31,
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpArrElement$83 /*:unknown*/ = $spy(`in operator`);
const tmpBinLhs$39 /*:array*/ = [tmpArrElement$83];
const tmpArrElement$79 /*:boolean*/ = tmpBinLhs$39 in x;
const tmpArrElement$85 /*:unknown*/ = $spy(`instanceof operator`);
const tmpBinLhs$41 /*:array*/ = [tmpArrElement$85];
const tmpArrElement$81 /*:boolean*/ = tmpBinLhs$41 instanceof x;
const arr2 /*:array*/ = [tmpArrElement$79, tmpArrElement$81];
$(arr2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement$39 = $(`** operator`);
const tmpArrElement = [tmpArrElement$39] ** x;
const tmpArrElement$41 = $(`* operator`);
const tmpArrElement$1 = [tmpArrElement$41] * x;
const tmpArrElement$43 = $(`/ operator`);
const tmpArrElement$3 = [tmpArrElement$43] / x;
const tmpArrElement$45 = $(`% operator`);
const tmpArrElement$5 = [tmpArrElement$45] % x;
const tmpArrElement$47 = $(`+ operator`);
const tmpArrElement$7 = [tmpArrElement$47] + x;
const tmpArrElement$49 = $(`- operator`);
const tmpArrElement$9 = [tmpArrElement$49] - x;
const tmpArrElement$51 = $(`<< operator`);
const tmpArrElement$11 = [tmpArrElement$51] << x;
const tmpArrElement$53 = $(`>> operator`);
const tmpArrElement$13 = [tmpArrElement$53] >> x;
const tmpArrElement$55 = $(`>>> operator`);
const tmpArrElement$15 = [tmpArrElement$55] >>> x;
const tmpArrElement$57 = $(`< operator`);
const tmpArrElement$17 = [tmpArrElement$57] < x;
const tmpArrElement$59 = $(`> operator`);
const tmpArrElement$19 = [tmpArrElement$59] > x;
const tmpArrElement$61 = $(`<= operator`);
const tmpArrElement$21 = [tmpArrElement$61] <= x;
const tmpArrElement$63 = $(`>= operator`);
const tmpArrElement$23 = [tmpArrElement$63] >= x;
const tmpArrElement$65 = $(`== operator`);
const tmpArrElement$25 = [tmpArrElement$65] == x;
const tmpArrElement$67 = $(`!= operator`);
const tmpArrElement$27 = [tmpArrElement$67] != x;
const tmpArrElement$69 = $(`=== operator`);
const tmpArrElement$29 = [tmpArrElement$69] === x;
const tmpArrElement$71 = $(`!== operator`);
const tmpArrElement$31 = [tmpArrElement$71] !== x;
const tmpArrElement$73 = $(`& operator`);
const tmpArrElement$33 = [tmpArrElement$73] & x;
const tmpArrElement$75 = $(`^ operator`);
const tmpArrElement$35 = [tmpArrElement$75] ^ x;
const tmpArrElement$77 = $(`| operator`);
const tmpArrElement$37 = [tmpArrElement$77] | x;
$([
  tmpArrElement,
  tmpArrElement$1,
  tmpArrElement$3,
  tmpArrElement$5,
  tmpArrElement$7,
  tmpArrElement$9,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  tmpArrElement$25,
  tmpArrElement$27,
  tmpArrElement$29,
  tmpArrElement$31,
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
]);
const tmpArrElement$83 = $spy(`in operator`);
const tmpArrElement$79 = [tmpArrElement$83] in x;
const tmpArrElement$85 = $spy(`instanceof operator`);
const tmpArrElement$81 = [tmpArrElement$85] instanceof x;
$([tmpArrElement$79, tmpArrElement$81]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "** operator" );
const b = [ a ];
const c = b ** x;
const d = $( "* operator" );
const e = [ d ];
const f = e * x;
const g = $( "/ operator" );
const h = [ g ];
const i = h / x;
const j = $( "% operator" );
const k = [ j ];
const l = k % x;
const m = $( "+ operator" );
const n = [ m ];
const o = n + x;
const p = $( "- operator" );
const q = [ p ];
const r = q - x;
const s = $( "<< operator" );
const t = [ s ];
const u = t << x;
const v = $( ">> operator" );
const w = [ v ];
const y = w >> x;
const z = $( ">>> operator" );
const ba = [ z ];
const bb = ba >>> x;
const bc = $( "< operator" );
const bd = [ bc ];
const be = bd < x;
const bf = $( "> operator" );
const bg = [ bf ];
const bh = bg > x;
const bi = $( "<= operator" );
const bj = [ bi ];
const bk = bj <= x;
const bl = $( ">= operator" );
const bm = [ bl ];
const bn = bm >= x;
const bo = $( "== operator" );
const bp = [ bo ];
const bq = bp == x;
const br = $( "!= operator" );
const bs = [ br ];
const bt = bs != x;
const bu = $( "=== operator" );
const bv = [ bu ];
const bw = bv === x;
const bx = $( "!== operator" );
const by = [ bx ];
const bz = by !== x;
const ca = $( "& operator" );
const cb = [ ca ];
const cc = cb & x;
const cd = $( "^ operator" );
const ce = [ cd ];
const cf = ce ^ x;
const cg = $( "| operator" );
const ch = [ cg ];
const ci = ch | x;
const cj = [ c, f, i, l, o, r, u, y, bb, be, bh, bk, bn, bq, bt, bw, bz, cc, cf, ci ];
$( cj );
const ck = $spy( "in operator" );
const cl = [ ck ];
const cm = cl in x;
const cn = $spy( "instanceof operator" );
const co = [ cn ];
const cp = co instanceof x;
const cq = [ cm, cp ];
$( cq );
`````


## Todos triggered


None


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - 1: '** operator'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
