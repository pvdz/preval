# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Assignments > Param default > Auto ident object empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = {})) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
$(undefined);
const tmpNestedComplexRhs /*:object*/ = {};
$(tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$({});
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
const a = {};
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
