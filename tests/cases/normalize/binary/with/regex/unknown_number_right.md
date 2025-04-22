# Preval test case

# unknown_number_right.md

> Normalize > Binary > With > Regex > Unknown number right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = 1 * $(1);

const arr = [
  /foo/g ** x,
  /foo/g * x,
  /foo/g / x,
  /foo/g % x,
  /foo/g + x,
  /foo/g - x,
  /foo/g << x,
  /foo/g >> x,
  /foo/g >>> x,
  /foo/g < x,
  /foo/g > x,
  /foo/g <= x,
  /foo/g >= x,
  /foo/g == x,
  /foo/g != x,
  /foo/g === x,
  /foo/g !== x,
  /foo/g & x,
  /foo/g ^ x,
  /foo/g | x,
];
$(arr);
$(/foo/g in x);
$(/foo/g instanceof x);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(1);
const x /*:number*/ = 1 * tmpBinBothRhs;
const tmpBinLhs /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement /*:number*/ = tmpBinLhs ** x;
const tmpBinLhs$1 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$1 /*:number*/ = tmpBinLhs$1 * x;
const tmpBinLhs$3 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$3 /*:number*/ = tmpBinLhs$3 / x;
const tmpBinLhs$5 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$5 /*:number*/ = tmpBinLhs$5 % x;
const tmpBinLhs$9 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$9 /*:number*/ = tmpBinLhs$9 - x;
const tmpBinLhs$11 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$11 /*:number*/ = tmpBinLhs$11 << x;
const tmpBinLhs$13 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$13 /*:number*/ = tmpBinLhs$13 >> x;
const tmpBinLhs$15 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$15 /*:number*/ = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$17 /*:boolean*/ = tmpBinLhs$17 < x;
const tmpBinLhs$19 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$19 /*:boolean*/ = tmpBinLhs$19 > x;
const tmpBinLhs$21 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$21 /*:boolean*/ = tmpBinLhs$21 <= x;
const tmpBinLhs$23 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$23 /*:boolean*/ = tmpBinLhs$23 >= x;
const tmpBinLhs$25 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$25 /*:boolean*/ = tmpBinLhs$25 == x;
const tmpBinLhs$27 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$27 /*:boolean*/ = tmpBinLhs$27 != x;
const tmpBinLhs$33 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$33 /*:number*/ = tmpBinLhs$33 & x;
const tmpBinLhs$35 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$35 /*:number*/ = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$37 /*:number*/ = tmpBinLhs$37 | x;
const tmpArrElement$7 /*:string*/ = `/foo/g${x}`;
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
const tmpBinLhs$39 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam /*:boolean*/ = tmpBinLhs$39 in x;
$(tmpCalleeParam);
const tmpBinLhs$41 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$1 /*:boolean*/ = tmpBinLhs$41 instanceof x;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(1);
const x = 1 * tmpBinBothRhs;
const tmpArrElement = new $regex_constructor(`foo`, `g`) ** x;
const tmpArrElement$1 = new $regex_constructor(`foo`, `g`) * x;
const tmpArrElement$3 = new $regex_constructor(`foo`, `g`) / x;
const tmpArrElement$5 = new $regex_constructor(`foo`, `g`) % x;
const tmpArrElement$9 = new $regex_constructor(`foo`, `g`) - x;
const tmpArrElement$11 = new $regex_constructor(`foo`, `g`) << x;
const tmpArrElement$13 = new $regex_constructor(`foo`, `g`) >> x;
const tmpArrElement$15 = new $regex_constructor(`foo`, `g`) >>> x;
const tmpArrElement$17 = new $regex_constructor(`foo`, `g`) < x;
const tmpArrElement$19 = new $regex_constructor(`foo`, `g`) > x;
const tmpArrElement$21 = new $regex_constructor(`foo`, `g`) <= x;
const tmpArrElement$23 = new $regex_constructor(`foo`, `g`) >= x;
const tmpArrElement$25 = new $regex_constructor(`foo`, `g`) == x;
const tmpArrElement$27 = new $regex_constructor(`foo`, `g`) != x;
const tmpArrElement$33 = new $regex_constructor(`foo`, `g`) & x;
const tmpArrElement$35 = new $regex_constructor(`foo`, `g`) ^ x;
const tmpArrElement$37 = new $regex_constructor(`foo`, `g`) | x;
const tmpArrElement$7 = `/foo/g${x}`;
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
$(new $regex_constructor(`foo`, `g`) in x);
$(new $regex_constructor(`foo`, `g`) instanceof x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = 1 * a;
const c = new $regex_constructor( "foo", "g" );
const d = c ** b;
const e = new $regex_constructor( "foo", "g" );
const f = e * b;
const g = new $regex_constructor( "foo", "g" );
const h = g / b;
const i = new $regex_constructor( "foo", "g" );
const j = i % b;
const k = new $regex_constructor( "foo", "g" );
const l = k - b;
const m = new $regex_constructor( "foo", "g" );
const n = m << b;
const o = new $regex_constructor( "foo", "g" );
const p = o >> b;
const q = new $regex_constructor( "foo", "g" );
const r = q >>> b;
const s = new $regex_constructor( "foo", "g" );
const t = s < b;
const u = new $regex_constructor( "foo", "g" );
const v = u > b;
const w = new $regex_constructor( "foo", "g" );
const x = w <= b;
const y = new $regex_constructor( "foo", "g" );
const z = y >= b;
const ba = new $regex_constructor( "foo", "g" );
const bb = ba == b;
const bc = new $regex_constructor( "foo", "g" );
const bd = bc != b;
const be = new $regex_constructor( "foo", "g" );
const bf = be & b;
const bg = new $regex_constructor( "foo", "g" );
const bh = bg ^ b;
const bi = new $regex_constructor( "foo", "g" );
const bj = bi | b;
const bk = `/foo/g${b}`;
const bl = [ d, f, h, j, bk, l, n, p, r, t, v, x, z, bb, bd, false, true, bf, bh, bj ];
$( bl );
const bm = new $regex_constructor( "foo", "g" );
const bn = bm in b;
$( bn );
const bo = new $regex_constructor( "foo", "g" );
const bp = bo instanceof b;
$( bp );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: [NaN, NaN, NaN, NaN, '/foo/g1', NaN, 0, 0, 0, false, false, false, false, false, true, false, true, 0, 1, 1]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '[object RegExp]' in 1 ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
