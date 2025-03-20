# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident delete computed complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ((a = delete $(arg)["y"])) {
  default:
    $(100);
}
$(a, arg);
`````


## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteObj.y;
$(100);
$(tmpClusterSSA_a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
const tmpClusterSSA_a = delete tmpDeleteObj.y;
$(100);
$(tmpClusterSSA_a, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = delete b.y;
$( 100 );
$( c, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { y: '1' }
 - 2: 100
 - 3: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
