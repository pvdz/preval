# Preval test case

# auto_ident_delete_prop_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident delete prop complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
function f(p = (a = delete $(arg).y)) {}
$(f());
$(a, arg);
`````


## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpNestedComplexRhs /*:boolean*/ = delete tmpDeleteObj.y;
$(undefined);
$(tmpNestedComplexRhs, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
const tmpNestedComplexRhs = delete tmpDeleteObj.y;
$(undefined);
$(tmpNestedComplexRhs, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = delete b.y;
$( undefined );
$( c, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { y: '1' }
 - 2: undefined
 - 3: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
