# Preval test case

# unknown_string_left.md

> Normalize > Binary > With > Null > Unknown string left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = '' + $('ok');

const arr = [
  x ** null,
  x * null,
  x / null,
  x % null,
  x + null,
  x - null,
  x << null,
  x >> null,
  x >>> null,
  x < null,
  x > null,
  x <= null,
  x >= null,
  x == null,
  x != null,
  x === null,
  x !== null,
  x & null,
  x ^ null,
  x | null,
];
$(arr);
$(x in null);
$(x instanceof null);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(`ok`);
const x /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const tmpArrElement /*:number*/ = x ** 0;
const tmpArrElement$1 /*:number*/ = x * 0;
const tmpArrElement$3 /*:number*/ = x / 0;
const tmpArrElement$5 /*:number*/ = x % 0;
const tmpArrElement$7 /*:string*/ = x + null;
const tmpArrElement$9 /*:number*/ = x - 0;
const tmpArrElement$11 /*:number*/ = x << 0;
const tmpArrElement$13 /*:number*/ = x >> 0;
const tmpArrElement$15 /*:number*/ = x >>> 0;
const tmpArrElement$17 /*:boolean*/ = x < 0;
const tmpArrElement$19 /*:boolean*/ = x > 0;
const tmpArrElement$21 /*:boolean*/ = x <= 0;
const tmpArrElement$23 /*:boolean*/ = x >= 0;
const tmpArrElement$35 /*:number*/ /*^0*/ = x ^ 0;
const tmpArrElement$37 /*:number*/ /*|0*/ = x | 0;
const arr /*:array*/ /*truthy*/ = [
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
  false,
  true,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpCalleeParam /*:boolean*/ = x in null;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = x instanceof null;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`ok`) + ``;
const tmpArrElement = x ** 0;
const tmpArrElement$1 = x * 0;
const tmpArrElement$3 = x / 0;
const tmpArrElement$5 = x % 0;
const tmpArrElement$7 = x + null;
const tmpArrElement$9 = x - 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < 0;
const tmpArrElement$19 = x > 0;
const tmpArrElement$21 = x <= 0;
const tmpArrElement$23 = x >= 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
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
  false,
  true,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
]);
$(x in null);
$(x instanceof null);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "ok" );
const b = $coerce( a, "plustr" );
const c = b ** 0;
const d = b * 0;
const e = b / 0;
const f = b % 0;
const g = b + null;
const h = b - 0;
const i = b << 0;
const j = b >> 0;
const k = b >>> 0;
const l = b < 0;
const m = b > 0;
const n = b <= 0;
const o = b >= 0;
const p = b ^ 0;
const q = b | 0;
const r = [ c, d, e, f, g, h, i, j, k, l, m, n, o, false, true, false, true, 0, p, q ];
$( r );
const s = b in null;
$( s );
const t = b instanceof null;
$( t );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $(`ok`);
const x = tmpBinBothLhs + tmpBinBothRhs;
const tmpArrElement = x ** 0;
const tmpArrElement$1 = x * 0;
const tmpArrElement$3 = x / 0;
const tmpArrElement$5 = x % 0;
const tmpArrElement$7 = x + null;
const tmpArrElement$9 = x - 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < 0;
const tmpArrElement$19 = x > 0;
const tmpArrElement$21 = x <= 0;
const tmpArrElement$23 = x >= 0;
const tmpArrElement$25 = x == null;
const tmpArrElement$27 = x != null;
const tmpArrElement$29 = x === null;
const tmpArrElement$31 = x !== null;
x & 0;
const tmpArrElement$33 = 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
const arr = [
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
let tmpCalleeParam = x in null;
$(tmpCalleeParam);
let tmpCalleeParam$1 = x instanceof null;
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ok'
 - 2: [1, NaN, NaN, NaN, 'oknull', NaN, 0, 0, 0, false, false, false, false, false, true, false, true, 0, 0, 0]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for 'ok' in null ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
