# Preval test case

# auto_computed_simple_simple_simple.md

> Normalize > Expressions > Assignments > Param default > Auto computed simple simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = { b: $(1) })) {}
$(f());
a["b"] = 2;
$(a);
`````


## Settled


`````js filename=intro
$(1);
$(undefined);
const tmpNestedComplexRhs /*:object*/ = { b: 2 };
$(tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(undefined);
$({ b: 2 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( undefined );
const a = { b: 2 };
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
