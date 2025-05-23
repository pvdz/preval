# Preval test case

# auto_prop_simple_simple.md

> Normalize > Expressions > Assignments > Label > Auto prop simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
label: a = { b: $(1) };
a.b = 2;
$(a);
`````


## Settled


`````js filename=intro
$(1);
const a /*:object*/ = { b: 2 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$({ b: 2 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = { b: 2 };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
a.b = 2;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
