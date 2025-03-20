# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto ident delete prop simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete arg.y) + (a = delete arg.y));
$(a, arg);
`````


## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const a /*:boolean*/ = delete arg.y;
const tmpClusterSSA_a /*:boolean*/ = delete arg.y;
const tmpCalleeParam /*:number*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const a = delete arg.y;
const tmpClusterSSA_a = delete arg.y;
$(a + tmpClusterSSA_a);
$(tmpClusterSSA_a, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = delete a.y;
const c = delete a.y;
const d = b + c;
$( d );
$( c, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
