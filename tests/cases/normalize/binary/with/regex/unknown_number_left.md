# Preval test case

# unknown_number_left.md

> Normalize > Binary > With > Regex > Unknown number left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = 1 * $(1);

$('x ** /foo/g:', x ** /foo/g);
$('x * /foo/g:', x * /foo/g);
$('x / /foo/g:', x / /foo/g);
$('x % /foo/g:', x % /foo/g);
$('x + /foo/g:', x + /foo/g);
$('x - /foo/g:', x - /foo/g);
$('x << /foo/g:', x << /foo/g);
$('x >> /foo/g:', x >> /foo/g);
$('x >>> /foo/g:', x >>> /foo/g);
$('x < /foo/g:', x < /foo/g);
$('x > /foo/g:', x > /foo/g);
$('x <= /foo/g:', x <= /foo/g);
$('x >= /foo/g:', x >= /foo/g);
$('x == /foo/g:', x == /foo/g);
$('x != /foo/g:', x != /foo/g);
$('x === /foo/g:', x === /foo/g);
$('x !== /foo/g:', x !== /foo/g);
$('x & /foo/g:', x & /foo/g);
$('x ^ /foo/g:', x ^ /foo/g);
$('x | /foo/g:', x | /foo/g);
$('x in /foo/g:', x in /foo/g);
$('x instanceof /foo/g:', x instanceof /foo/g);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(1);
const x /*:number*/ = 1 * tmpBinBothRhs;
const tmpBinBothRhs$1 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam /*:number*/ = x ** tmpBinBothRhs$1;
$(`x ** /foo/g:`, tmpCalleeParam);
const tmpBinBothRhs$3 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$1 /*:number*/ = x * tmpBinBothRhs$3;
$(`x * /foo/g:`, tmpCalleeParam$1);
const tmpBinBothRhs$5 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$3 /*:number*/ = x / tmpBinBothRhs$5;
$(`x / /foo/g:`, tmpCalleeParam$3);
const tmpBinBothRhs$7 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$5 /*:number*/ = x % tmpBinBothRhs$7;
$(`x % /foo/g:`, tmpCalleeParam$5);
const tmpBinBothRhs$9 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$7 /*:primitive*/ = x + tmpBinBothRhs$9;
$(`x + /foo/g:`, tmpCalleeParam$7);
const tmpBinBothRhs$11 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$9 /*:number*/ = x - tmpBinBothRhs$11;
$(`x - /foo/g:`, tmpCalleeParam$9);
const tmpBinBothRhs$13 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$11 /*:number*/ = x << tmpBinBothRhs$13;
$(`x << /foo/g:`, tmpCalleeParam$11);
const tmpBinBothRhs$15 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$13 /*:number*/ = x >> tmpBinBothRhs$15;
$(`x >> /foo/g:`, tmpCalleeParam$13);
const tmpBinBothRhs$17 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$15 /*:number*/ = x >>> tmpBinBothRhs$17;
$(`x >>> /foo/g:`, tmpCalleeParam$15);
const tmpBinBothRhs$19 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$17 /*:boolean*/ = x < tmpBinBothRhs$19;
$(`x < /foo/g:`, tmpCalleeParam$17);
const tmpBinBothRhs$21 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$19 /*:boolean*/ = x > tmpBinBothRhs$21;
$(`x > /foo/g:`, tmpCalleeParam$19);
const tmpBinBothRhs$23 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$21 /*:boolean*/ = x <= tmpBinBothRhs$23;
$(`x <= /foo/g:`, tmpCalleeParam$21);
const tmpBinBothRhs$25 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$23 /*:boolean*/ = x >= tmpBinBothRhs$25;
$(`x >= /foo/g:`, tmpCalleeParam$23);
const tmpBinBothRhs$27 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$25 /*:boolean*/ = x == tmpBinBothRhs$27;
$(`x == /foo/g:`, tmpCalleeParam$25);
const tmpBinBothRhs$29 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$27 /*:boolean*/ = x != tmpBinBothRhs$29;
$(`x != /foo/g:`, tmpCalleeParam$27);
$(`x === /foo/g:`, false);
$(`x !== /foo/g:`, true);
const tmpBinBothRhs$35 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$33 /*:number*/ = x & tmpBinBothRhs$35;
$(`x & /foo/g:`, tmpCalleeParam$33);
const tmpBinBothRhs$37 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$35 /*:number*/ = x ^ tmpBinBothRhs$37;
$(`x ^ /foo/g:`, tmpCalleeParam$35);
const tmpBinBothRhs$39 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$37 /*:number*/ = x | tmpBinBothRhs$39;
$(`x | /foo/g:`, tmpCalleeParam$37);
const tmpBinBothRhs$41 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$39 /*:boolean*/ = x in tmpBinBothRhs$41;
$(`x in /foo/g:`, tmpCalleeParam$39);
const tmpBinBothRhs$43 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$41 /*:boolean*/ = x instanceof tmpBinBothRhs$43;
$(`x instanceof /foo/g:`, tmpCalleeParam$41);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(1);
const x = 1 * tmpBinBothRhs;
$(`x ** /foo/g:`, x ** new $regex_constructor(`foo`, `g`));
$(`x * /foo/g:`, x * new $regex_constructor(`foo`, `g`));
$(`x / /foo/g:`, x / new $regex_constructor(`foo`, `g`));
$(`x % /foo/g:`, x % new $regex_constructor(`foo`, `g`));
$(`x + /foo/g:`, x + new $regex_constructor(`foo`, `g`));
$(`x - /foo/g:`, x - new $regex_constructor(`foo`, `g`));
$(`x << /foo/g:`, x << new $regex_constructor(`foo`, `g`));
$(`x >> /foo/g:`, x >> new $regex_constructor(`foo`, `g`));
$(`x >>> /foo/g:`, x >>> new $regex_constructor(`foo`, `g`));
$(`x < /foo/g:`, x < new $regex_constructor(`foo`, `g`));
$(`x > /foo/g:`, x > new $regex_constructor(`foo`, `g`));
$(`x <= /foo/g:`, x <= new $regex_constructor(`foo`, `g`));
$(`x >= /foo/g:`, x >= new $regex_constructor(`foo`, `g`));
$(`x == /foo/g:`, x == new $regex_constructor(`foo`, `g`));
$(`x != /foo/g:`, x != new $regex_constructor(`foo`, `g`));
$(`x === /foo/g:`, false);
$(`x !== /foo/g:`, true);
$(`x & /foo/g:`, x & new $regex_constructor(`foo`, `g`));
$(`x ^ /foo/g:`, x ^ new $regex_constructor(`foo`, `g`));
$(`x | /foo/g:`, x | new $regex_constructor(`foo`, `g`));
$(`x in /foo/g:`, x in new $regex_constructor(`foo`, `g`));
$(`x instanceof /foo/g:`, x instanceof new $regex_constructor(`foo`, `g`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = 1 * a;
const c = new $regex_constructor( "foo", "g" );
const d = b ** c;
$( "x ** /foo/g:", d );
const e = new $regex_constructor( "foo", "g" );
const f = b * e;
$( "x * /foo/g:", f );
const g = new $regex_constructor( "foo", "g" );
const h = b / g;
$( "x / /foo/g:", h );
const i = new $regex_constructor( "foo", "g" );
const j = b % i;
$( "x % /foo/g:", j );
const k = new $regex_constructor( "foo", "g" );
const l = b + k;
$( "x + /foo/g:", l );
const m = new $regex_constructor( "foo", "g" );
const n = b - m;
$( "x - /foo/g:", n );
const o = new $regex_constructor( "foo", "g" );
const p = b << o;
$( "x << /foo/g:", p );
const q = new $regex_constructor( "foo", "g" );
const r = b >> q;
$( "x >> /foo/g:", r );
const s = new $regex_constructor( "foo", "g" );
const t = b >>> s;
$( "x >>> /foo/g:", t );
const u = new $regex_constructor( "foo", "g" );
const v = b < u;
$( "x < /foo/g:", v );
const w = new $regex_constructor( "foo", "g" );
const x = b > w;
$( "x > /foo/g:", x );
const y = new $regex_constructor( "foo", "g" );
const z = b <= y;
$( "x <= /foo/g:", z );
const ba = new $regex_constructor( "foo", "g" );
const bb = b >= ba;
$( "x >= /foo/g:", bb );
const bc = new $regex_constructor( "foo", "g" );
const bd = b == bc;
$( "x == /foo/g:", bd );
const be = new $regex_constructor( "foo", "g" );
const bf = b != be;
$( "x != /foo/g:", bf );
$( "x === /foo/g:", false );
$( "x !== /foo/g:", true );
const bg = new $regex_constructor( "foo", "g" );
const bh = b & bg;
$( "x & /foo/g:", bh );
const bi = new $regex_constructor( "foo", "g" );
const bj = b ^ bi;
$( "x ^ /foo/g:", bj );
const bk = new $regex_constructor( "foo", "g" );
const bl = b | bk;
$( "x | /foo/g:", bl );
const bm = new $regex_constructor( "foo", "g" );
const bn = b in bm;
$( "x in /foo/g:", bn );
const bo = new $regex_constructor( "foo", "g" );
const bp = b instanceof bo;
$( "x instanceof /foo/g:", bp );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(1);
const x = tmpBinBothLhs * tmpBinBothRhs;
const tmpBinBothLhs$1 = x;
const tmpBinBothRhs$1 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam = tmpBinBothLhs$1 ** tmpBinBothRhs$1;
$(`x ** /foo/g:`, tmpCalleeParam);
const tmpBinBothLhs$3 = x;
const tmpBinBothRhs$3 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$1 = tmpBinBothLhs$3 * tmpBinBothRhs$3;
$(`x * /foo/g:`, tmpCalleeParam$1);
const tmpBinBothLhs$5 = x;
const tmpBinBothRhs$5 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$3 = tmpBinBothLhs$5 / tmpBinBothRhs$5;
$(`x / /foo/g:`, tmpCalleeParam$3);
const tmpBinBothLhs$7 = x;
const tmpBinBothRhs$7 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$5 = tmpBinBothLhs$7 % tmpBinBothRhs$7;
$(`x % /foo/g:`, tmpCalleeParam$5);
const tmpBinBothLhs$9 = x;
const tmpBinBothRhs$9 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$7 = tmpBinBothLhs$9 + tmpBinBothRhs$9;
$(`x + /foo/g:`, tmpCalleeParam$7);
const tmpBinBothLhs$11 = x;
const tmpBinBothRhs$11 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$9 = tmpBinBothLhs$11 - tmpBinBothRhs$11;
$(`x - /foo/g:`, tmpCalleeParam$9);
const tmpBinBothLhs$13 = x;
const tmpBinBothRhs$13 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$11 = tmpBinBothLhs$13 << tmpBinBothRhs$13;
$(`x << /foo/g:`, tmpCalleeParam$11);
const tmpBinBothLhs$15 = x;
const tmpBinBothRhs$15 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$13 = tmpBinBothLhs$15 >> tmpBinBothRhs$15;
$(`x >> /foo/g:`, tmpCalleeParam$13);
const tmpBinBothLhs$17 = x;
const tmpBinBothRhs$17 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$15 = tmpBinBothLhs$17 >>> tmpBinBothRhs$17;
$(`x >>> /foo/g:`, tmpCalleeParam$15);
const tmpBinBothLhs$19 = x;
const tmpBinBothRhs$19 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$17 = tmpBinBothLhs$19 < tmpBinBothRhs$19;
$(`x < /foo/g:`, tmpCalleeParam$17);
const tmpBinBothLhs$21 = x;
const tmpBinBothRhs$21 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$19 = tmpBinBothLhs$21 > tmpBinBothRhs$21;
$(`x > /foo/g:`, tmpCalleeParam$19);
const tmpBinBothLhs$23 = x;
const tmpBinBothRhs$23 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$21 = tmpBinBothLhs$23 <= tmpBinBothRhs$23;
$(`x <= /foo/g:`, tmpCalleeParam$21);
const tmpBinBothLhs$25 = x;
const tmpBinBothRhs$25 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$23 = tmpBinBothLhs$25 >= tmpBinBothRhs$25;
$(`x >= /foo/g:`, tmpCalleeParam$23);
const tmpBinBothLhs$27 = x;
const tmpBinBothRhs$27 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$25 = tmpBinBothLhs$27 == tmpBinBothRhs$27;
$(`x == /foo/g:`, tmpCalleeParam$25);
const tmpBinBothLhs$29 = x;
const tmpBinBothRhs$29 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$27 = tmpBinBothLhs$29 != tmpBinBothRhs$29;
$(`x != /foo/g:`, tmpCalleeParam$27);
const tmpBinBothLhs$31 = x;
const tmpBinBothRhs$31 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$29 = tmpBinBothLhs$31 === tmpBinBothRhs$31;
$(`x === /foo/g:`, tmpCalleeParam$29);
const tmpBinBothLhs$33 = x;
const tmpBinBothRhs$33 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$31 = tmpBinBothLhs$33 !== tmpBinBothRhs$33;
$(`x !== /foo/g:`, tmpCalleeParam$31);
const tmpBinBothLhs$35 = x;
const tmpBinBothRhs$35 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$33 = tmpBinBothLhs$35 & tmpBinBothRhs$35;
$(`x & /foo/g:`, tmpCalleeParam$33);
const tmpBinBothLhs$37 = x;
const tmpBinBothRhs$37 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$35 = tmpBinBothLhs$37 ^ tmpBinBothRhs$37;
$(`x ^ /foo/g:`, tmpCalleeParam$35);
const tmpBinBothLhs$39 = x;
const tmpBinBothRhs$39 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$37 = tmpBinBothLhs$39 | tmpBinBothRhs$39;
$(`x | /foo/g:`, tmpCalleeParam$37);
const tmpBinBothLhs$41 = x;
const tmpBinBothRhs$41 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$39 = tmpBinBothLhs$41 in tmpBinBothRhs$41;
$(`x in /foo/g:`, tmpCalleeParam$39);
const tmpBinBothLhs$43 = x;
const tmpBinBothRhs$43 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$41 = tmpBinBothLhs$43 instanceof tmpBinBothRhs$43;
$(`x instanceof /foo/g:`, tmpCalleeParam$41);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'x ** /foo/g:', NaN
 - 3: 'x * /foo/g:', NaN
 - 4: 'x / /foo/g:', NaN
 - 5: 'x % /foo/g:', NaN
 - 6: 'x + /foo/g:', '1/foo/g'
 - 7: 'x - /foo/g:', NaN
 - 8: 'x << /foo/g:', 1
 - 9: 'x >> /foo/g:', 1
 - 10: 'x >>> /foo/g:', 1
 - 11: 'x < /foo/g:', false
 - 12: 'x > /foo/g:', false
 - 13: 'x <= /foo/g:', false
 - 14: 'x >= /foo/g:', false
 - 15: 'x == /foo/g:', false
 - 16: 'x != /foo/g:', true
 - 17: 'x === /foo/g:', false
 - 18: 'x !== /foo/g:', true
 - 19: 'x & /foo/g:', 0
 - 20: 'x ^ /foo/g:', 1
 - 21: 'x | /foo/g:', 1
 - 22: 'x in /foo/g:', false
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
