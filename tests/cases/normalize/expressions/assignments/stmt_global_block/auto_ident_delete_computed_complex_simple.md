# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Assignments > Stmt global block > Auto ident delete computed complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
{
  let arg = { y: 1 };

  let a = { a: 999, b: 1000 };
  a = delete $(arg)["y"];
  $(a, arg);
}
`````


## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteObj.y;
$(tmpClusterSSA_a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
$(delete tmpDeleteObj.y, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = delete b.y;
$( c, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { y: '1' }
 - 2: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
