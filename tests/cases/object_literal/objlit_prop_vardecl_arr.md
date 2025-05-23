# Preval test case

# objlit_prop_vardecl_arr.md

> Object literal > Objlit prop vardecl arr
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
    const tmpObjLitVal /*:unknown*/ = $(1);
const o /*:object*/ = { x: tmpObjLitVal };
const f = [];
const tmpCalleeParam$1 /*:unknown*/ = o.x; // <- can inline if we know f is not spying
$(tmpCalleeParam$1);
o.x = 10;
f();
f();
f();
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
$(tmpObjLitVal);
const f /*:array*/ = [];
f();
f();
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1));
const f = [];
f();
f();
f();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
const b = [];
b();
b();
b();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = $(1);
const o = { x: tmpObjLitVal };
const f = [];
const tmpCalleeParam$1 = o.x;
$(tmpCalleeParam$1);
o.x = 10;
f();
f();
f();
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
