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
const tmpCalleeParam /*:array*/ /*truthy*/ = [];
const tmpMCP /*:unknown*/ = $(tmpCalleeParam);
const tmpUnaryArg /*:array*/ /*truthy*/ = $Array_from(tmpMCP);
const tmpArrElement /*:number*/ = ~tmpUnaryArg;
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [];
const tmpMCP$1 /*:unknown*/ = $(tmpCalleeParam$1);
$Array_from(tmpMCP$1);
const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [];
const tmpMCP$3 /*:unknown*/ = $(tmpCalleeParam$3);
const tmpUnaryArg$3 /*:array*/ /*truthy*/ = $Array_from(tmpMCP$3);
const tmpArrElement$3 /*:number*/ = -tmpUnaryArg$3;
const tmpCalleeParam$5 /*:array*/ /*truthy*/ = [];
const tmpMCP$5 /*:unknown*/ = $(tmpCalleeParam$5);
const tmpUnaryArg$5 /*:array*/ /*truthy*/ = $Array_from(tmpMCP$5);
const tmpArrElement$5 /*:number*/ = +tmpUnaryArg$5;
const tmpCalleeParam$7 /*:array*/ /*truthy*/ = [];
const tmpMCP$7 /*:unknown*/ = $(tmpCalleeParam$7);
$Array_from(tmpMCP$7);
const tmpCalleeParam$9 /*:array*/ /*truthy*/ = [];
const tmpMCP$9 /*:unknown*/ = $(tmpCalleeParam$9);
$Array_from(tmpMCP$9);
const arr /*:array*/ /*truthy*/ = [tmpArrElement, false, tmpArrElement$3, tmpArrElement$5, `object`, undefined];
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Array_from;
let tmpCalleeParam = [];
const tmpMCP = $(tmpCalleeParam);
const tmpUnaryArg = $dotCall(tmpMCF, $array_constructor, `from`, tmpMCP);
const tmpArrElement = ~tmpUnaryArg;
const tmpMCF$1 = $Array_from;
let tmpCalleeParam$1 = [];
const tmpMCP$1 = $(tmpCalleeParam$1);
const tmpUnaryArg$1 = $dotCall(tmpMCF$1, $array_constructor, `from`, tmpMCP$1);
const tmpArrElement$1 = !tmpUnaryArg$1;
const tmpMCF$3 = $Array_from;
let tmpCalleeParam$3 = [];
const tmpMCP$3 = $(tmpCalleeParam$3);
const tmpUnaryArg$3 = $dotCall(tmpMCF$3, $array_constructor, `from`, tmpMCP$3);
const tmpArrElement$3 = -tmpUnaryArg$3;
const tmpMCF$5 = $Array_from;
let tmpCalleeParam$5 = [];
const tmpMCP$5 = $(tmpCalleeParam$5);
const tmpUnaryArg$5 = $dotCall(tmpMCF$5, $array_constructor, `from`, tmpMCP$5);
const tmpArrElement$5 = +tmpUnaryArg$5;
const tmpMCF$7 = $Array_from;
let tmpCalleeParam$7 = [];
const tmpMCP$7 = $(tmpCalleeParam$7);
const tmpUnaryArg$7 = $dotCall(tmpMCF$7, $array_constructor, `from`, tmpMCP$7);
const tmpArrElement$7 = typeof tmpUnaryArg$7;
const tmpMCF$9 = $Array_from;
let tmpCalleeParam$9 = [];
const tmpMCP$9 = $(tmpCalleeParam$9);
$dotCall(tmpMCF$9, $array_constructor, `from`, tmpMCP$9);
const tmpArrElement$9 = undefined;
const arr = [tmpArrElement, tmpArrElement$1, tmpArrElement$3, tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
$(arr);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement
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
