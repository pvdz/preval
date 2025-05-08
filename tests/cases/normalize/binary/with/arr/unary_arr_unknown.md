# Preval test case

# unary_arr_unknown.md

> Normalize > Binary > With > Arr > Unary arr unknown
>
> Deal with certain primitive with binary ops

In this variant we only tell preval that the value is an array
but it won't know the actual value of the array so it's purely
type based transforms.
This is different from the literal case because those can be
resolved, and at some point hopefully it will.

## Input

`````js filename=intro
const arr = [
  ~ Array.from($([])),
  ! Array.from($([])),
  - Array.from($([])),
  + Array.from($([])),
  typeof Array.from($([])),
  void Array.from($([])),
];
$(arr);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [];
const tmpMCP /*:unknown*/ = $(tmpCalleeParam);
const tmpUnaryArg /*:array*/ = $Array_from(tmpMCP);
const tmpArrElement /*:number*/ = ~tmpUnaryArg;
const tmpCalleeParam$1 /*:array*/ = [];
const tmpMCP$1 /*:unknown*/ = $(tmpCalleeParam$1);
$Array_from(tmpMCP$1);
const tmpCalleeParam$3 /*:array*/ = [];
const tmpMCP$3 /*:unknown*/ = $(tmpCalleeParam$3);
const tmpUnaryArg$3 /*:array*/ = $Array_from(tmpMCP$3);
const tmpArrElement$3 /*:number*/ = -tmpUnaryArg$3;
const tmpCalleeParam$5 /*:array*/ = [];
const tmpMCP$5 /*:unknown*/ = $(tmpCalleeParam$5);
const tmpUnaryArg$5 /*:array*/ = $Array_from(tmpMCP$5);
const tmpArrElement$5 /*:number*/ = +tmpUnaryArg$5;
const tmpCalleeParam$7 /*:array*/ = [];
const tmpMCP$7 /*:unknown*/ = $(tmpCalleeParam$7);
$Array_from(tmpMCP$7);
const tmpCalleeParam$9 /*:array*/ = [];
const tmpMCP$9 /*:unknown*/ = $(tmpCalleeParam$9);
$Array_from(tmpMCP$9);
const arr /*:array*/ = [tmpArrElement, false, tmpArrElement$3, tmpArrElement$5, `object`, undefined];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $Array_from($([]));
const tmpArrElement = ~tmpUnaryArg;
$Array_from($([]));
const tmpUnaryArg$3 = $Array_from($([]));
const tmpArrElement$3 = -tmpUnaryArg$3;
const tmpUnaryArg$5 = $Array_from($([]));
const tmpArrElement$5 = +tmpUnaryArg$5;
$Array_from($([]));
$Array_from($([]));
$([tmpArrElement, false, tmpArrElement$3, tmpArrElement$5, `object`, undefined]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $( a );
const c = $Array_from( b );
const d = ~c;
const e = [];
const f = $( e );
$Array_from( f );
const g = [];
const h = $( g );
const i = $Array_from( h );
const j = -i;
const k = [];
const l = $( k );
const m = $Array_from( l );
const n = +m;
const o = [];
const p = $( o );
$Array_from( p );
const q = [];
const r = $( q );
$Array_from( r );
const s = [ d, false, j, n, "object", undefined ];
$( s );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Array_from


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - 2: []
 - 3: []
 - 4: []
 - 5: []
 - 6: []
 - 7: [-1, false, 0, 0, 'object', undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
