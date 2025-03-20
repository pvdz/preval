# Preval test case

# unknown_string_left.md

> Normalize > Binary > With > Regex > Unknown string left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = '' + $('ok');

const arr = [
  x ** /foo/g,
  x * /foo/g,
  x / /foo/g,
  x % /foo/g,
  x + /foo/g,
  x - /foo/g,
  x << /foo/g,
  x >> /foo/g,
  x >>> /foo/g,
  x < /foo/g,
  x > /foo/g,
  x <= /foo/g,
  x >= /foo/g,
  x == /foo/g,
  x != /foo/g,
  x === /foo/g,
  x !== /foo/g,
  x & /foo/g,
  x ^ /foo/g,
  x | /foo/g,
];
$(arr);
$(x in /foo/g);
$(x instanceof /foo/g);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(`ok`);
const x /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const tmpBinBothRhs$1 /*:regex*/ = /foo/g;
const tmpArrElement /*:number*/ = x ** tmpBinBothRhs$1;
const tmpBinBothRhs$3 /*:regex*/ = /foo/g;
const tmpArrElement$1 /*:number*/ = x * tmpBinBothRhs$3;
const tmpBinBothRhs$5 /*:regex*/ = /foo/g;
const tmpArrElement$3 /*:number*/ = x / tmpBinBothRhs$5;
const tmpBinBothRhs$7 /*:regex*/ = /foo/g;
const tmpArrElement$5 /*:number*/ = x % tmpBinBothRhs$7;
const tmpBinBothRhs$9 /*:regex*/ = /foo/g;
const tmpArrElement$7 /*:string*/ = x + tmpBinBothRhs$9;
const tmpBinBothRhs$11 /*:regex*/ = /foo/g;
const tmpArrElement$9 /*:number*/ = x - tmpBinBothRhs$11;
const tmpBinBothRhs$13 /*:regex*/ = /foo/g;
const tmpArrElement$11 /*:number*/ = x << tmpBinBothRhs$13;
const tmpBinBothRhs$15 /*:regex*/ = /foo/g;
const tmpArrElement$13 /*:number*/ = x >> tmpBinBothRhs$15;
const tmpBinBothRhs$17 /*:regex*/ = /foo/g;
const tmpArrElement$15 /*:number*/ = x >>> tmpBinBothRhs$17;
const tmpBinBothRhs$19 /*:regex*/ = /foo/g;
const tmpArrElement$17 /*:boolean*/ = x < tmpBinBothRhs$19;
const tmpBinBothRhs$21 /*:regex*/ = /foo/g;
const tmpArrElement$19 /*:boolean*/ = x > tmpBinBothRhs$21;
const tmpBinBothRhs$23 /*:regex*/ = /foo/g;
const tmpArrElement$21 /*:boolean*/ = x <= tmpBinBothRhs$23;
const tmpBinBothRhs$25 /*:regex*/ = /foo/g;
const tmpArrElement$23 /*:boolean*/ = x >= tmpBinBothRhs$25;
const tmpBinBothRhs$27 /*:regex*/ = /foo/g;
const tmpArrElement$25 /*:boolean*/ = x == tmpBinBothRhs$27;
const tmpBinBothRhs$29 /*:regex*/ = /foo/g;
const tmpArrElement$27 /*:boolean*/ = x != tmpBinBothRhs$29;
const tmpBinBothRhs$35 /*:regex*/ = /foo/g;
const tmpArrElement$33 /*:number*/ = x & tmpBinBothRhs$35;
const tmpBinBothRhs$37 /*:regex*/ = /foo/g;
const tmpArrElement$35 /*:number*/ = x ^ tmpBinBothRhs$37;
const tmpBinBothRhs$39 /*:regex*/ = /foo/g;
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
const tmpBinBothRhs$41 /*:regex*/ = /foo/g;
const tmpCalleeParam /*:boolean*/ = x in tmpBinBothRhs$41;
$(tmpCalleeParam);
const tmpBinBothRhs$43 /*:regex*/ = /foo/g;
const tmpCalleeParam$1 /*:boolean*/ = x instanceof tmpBinBothRhs$43;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $coerce($(`ok`), `plustr`);
const tmpArrElement = x ** /foo/g;
const tmpArrElement$1 = x * /foo/g;
const tmpArrElement$3 = x / /foo/g;
const tmpArrElement$5 = x % /foo/g;
const tmpArrElement$7 = x + /foo/g;
const tmpArrElement$9 = x - /foo/g;
const tmpArrElement$11 = x << /foo/g;
const tmpArrElement$13 = x >> /foo/g;
const tmpArrElement$15 = x >>> /foo/g;
const tmpArrElement$17 = x < /foo/g;
const tmpArrElement$19 = x > /foo/g;
const tmpArrElement$21 = x <= /foo/g;
const tmpArrElement$23 = x >= /foo/g;
const tmpArrElement$25 = x == /foo/g;
const tmpArrElement$27 = x != /foo/g;
const tmpArrElement$33 = x & /foo/g;
const tmpArrElement$35 = x ^ /foo/g;
const tmpArrElement$37 = x | /foo/g;
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
$(x in /foo/g);
$(x instanceof /foo/g);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "ok" );
const b = $coerce( a, "plustr" );
const c = /foo/g;
const d = b ** c;
const e = /foo/g;
const f = b * e;
const g = /foo/g;
const h = b / g;
const i = /foo/g;
const j = b % i;
const k = /foo/g;
const l = b + k;
const m = /foo/g;
const n = b - m;
const o = /foo/g;
const p = b << o;
const q = /foo/g;
const r = b >> q;
const s = /foo/g;
const t = b >>> s;
const u = /foo/g;
const v = b < u;
const w = /foo/g;
const x = b > w;
const y = /foo/g;
const z = b <= y;
const ba = /foo/g;
const bb = b >= ba;
const bc = /foo/g;
const bd = b == bc;
const be = /foo/g;
const bf = b != be;
const bg = /foo/g;
const bh = b & bg;
const bi = /foo/g;
const bj = b ^ bi;
const bk = /foo/g;
const bl = b | bk;
const bm = [ d, f, h, j, l, n, p, r, t, v, x, z, bb, bd, bf, false, true, bh, bj, bl ];
$( bm );
const bn = /foo/g;
const bo = b in bn;
$( bo );
const bp = /foo/g;
const bq = b instanceof bp;
$( bq );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ok'
 - 2: [NaN, NaN, NaN, NaN, 'ok/foo/g', NaN, 0, 0, 0, false, true, false, true, false, true, false, true, 0, 0, 0]
 - 3: false
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
