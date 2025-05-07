# Preval test case

# unknown_string_left.md

> Normalize > Binary > With > Obj > Unknown string left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = '' + $('ok');

const arr = [
  x ** {},
  x * {},
  x / {},
  x % {},
  x + {},
  x - {},
  x << {},
  x >> {},
  x >>> {},
  x < {},
  x > {},
  x <= {},
  x >= {},
  x == {},
  x != {},
  x === {},
  x !== {},
  x & {},
  x ^ {},
  x | {},
];
$(arr);
$(x in {});
$(x instanceof {});
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(`ok`);
const x /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const tmpBinBothRhs$1 /*:object*/ = {};
const tmpArrElement /*:number*/ = x ** tmpBinBothRhs$1;
const tmpBinBothRhs$3 /*:object*/ = {};
const tmpArrElement$1 /*:number*/ = x * tmpBinBothRhs$3;
const tmpBinBothRhs$5 /*:object*/ = {};
const tmpArrElement$3 /*:number*/ = x / tmpBinBothRhs$5;
const tmpBinBothRhs$7 /*:object*/ = {};
const tmpArrElement$5 /*:number*/ = x % tmpBinBothRhs$7;
const tmpBinBothRhs$9 /*:object*/ = {};
const tmpArrElement$7 /*:string*/ = x + tmpBinBothRhs$9;
const tmpBinBothRhs$11 /*:object*/ = {};
const tmpArrElement$9 /*:number*/ = x - tmpBinBothRhs$11;
const tmpBinBothRhs$13 /*:object*/ = {};
const tmpArrElement$11 /*:number*/ = x << tmpBinBothRhs$13;
const tmpBinBothRhs$15 /*:object*/ = {};
const tmpArrElement$13 /*:number*/ = x >> tmpBinBothRhs$15;
const tmpBinBothRhs$17 /*:object*/ = {};
const tmpArrElement$15 /*:number*/ = x >>> tmpBinBothRhs$17;
const tmpBinBothRhs$19 /*:object*/ = {};
const tmpArrElement$17 /*:boolean*/ = x < tmpBinBothRhs$19;
const tmpBinBothRhs$21 /*:object*/ = {};
const tmpArrElement$19 /*:boolean*/ = x > tmpBinBothRhs$21;
const tmpBinBothRhs$23 /*:object*/ = {};
const tmpArrElement$21 /*:boolean*/ = x <= tmpBinBothRhs$23;
const tmpBinBothRhs$25 /*:object*/ = {};
const tmpArrElement$23 /*:boolean*/ = x >= tmpBinBothRhs$25;
const tmpBinBothRhs$27 /*:object*/ = {};
const tmpArrElement$25 /*:boolean*/ = x == tmpBinBothRhs$27;
const tmpBinBothRhs$29 /*:object*/ = {};
const tmpArrElement$27 /*:boolean*/ = x != tmpBinBothRhs$29;
const tmpBinBothRhs$35 /*:object*/ = {};
const tmpArrElement$33 /*:number*/ = x & tmpBinBothRhs$35;
const tmpBinBothRhs$37 /*:object*/ = {};
const tmpArrElement$35 /*:number*/ = x ^ tmpBinBothRhs$37;
const tmpBinBothRhs$39 /*:object*/ = {};
const tmpArrElement$37 /*:number*/ = x | tmpBinBothRhs$39;
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
  false,
  true,
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpBinBothRhs$41 /*:object*/ = {};
const tmpCalleeParam /*:boolean*/ = x in tmpBinBothRhs$41;
$(tmpCalleeParam);
const tmpBinBothRhs$43 /*:object*/ = {};
const tmpCalleeParam$1 /*:boolean*/ = x instanceof tmpBinBothRhs$43;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $coerce($(`ok`), `plustr`);
const tmpArrElement = x ** {};
const tmpArrElement$1 = x * {};
const tmpArrElement$3 = x / {};
const tmpArrElement$5 = x % {};
const tmpArrElement$7 = x + {};
const tmpArrElement$9 = x - {};
const tmpArrElement$11 = x << {};
const tmpArrElement$13 = x >> {};
const tmpArrElement$15 = x >>> {};
const tmpArrElement$17 = x < {};
const tmpArrElement$19 = x > {};
const tmpArrElement$21 = x <= {};
const tmpArrElement$23 = x >= {};
const tmpArrElement$25 = x == {};
const tmpArrElement$27 = x != {};
const tmpArrElement$33 = x & {};
const tmpArrElement$35 = x ^ {};
const tmpArrElement$37 = x | {};
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
  false,
  true,
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
]);
$(x in {});
$(x instanceof {});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "ok" );
const b = $coerce( a, "plustr" );
const c = {};
const d = b ** c;
const e = {};
const f = b * e;
const g = {};
const h = b / g;
const i = {};
const j = b % i;
const k = {};
const l = b + k;
const m = {};
const n = b - m;
const o = {};
const p = b << o;
const q = {};
const r = b >> q;
const s = {};
const t = b >>> s;
const u = {};
const v = b < u;
const w = {};
const x = b > w;
const y = {};
const z = b <= y;
const ba = {};
const bb = b >= ba;
const bc = {};
const bd = b == bc;
const be = {};
const bf = b != be;
const bg = {};
const bh = b & bg;
const bi = {};
const bj = b ^ bi;
const bk = {};
const bl = b | bk;
const bm = [ d, f, h, j, l, n, p, r, t, v, x, z, bb, bd, bf, false, true, bh, bj, bl ];
$( bm );
const bn = {};
const bo = b in bn;
$( bo );
const bp = {};
const bq = b instanceof bp;
$( bq );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ok'
 - 2: [NaN, NaN, NaN, NaN, 'ok[object Object]', NaN, 0, 0, 0, false, true, false, true, false, true, false, true, 0, 0, 0]
 - 3: false
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
