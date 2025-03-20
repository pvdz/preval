# Preval test case

# auto_ident_delete_prop_complex.md

> Normalize > Expressions > Assignments > Throw > Auto ident delete prop complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
throw (a = delete $(arg).y);
$(a, arg);
`````


## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteObj.y;
throw tmpClusterSSA_a;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpDeleteObj = $({ y: 1 });
const tmpClusterSSA_a = delete tmpDeleteObj.y;
throw tmpClusterSSA_a;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = delete b.y;
throw c;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { y: '1' }
 - eval returned: ('<crash[ true ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
