# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Switch default > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    ({ a } = $({ a: 1, b: 2 }));
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpClusterSSA_a /*:unknown*/ = tmpAssignObjPatternRhs.a;
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($({ a: 1, b: 2 }).a);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
const c = b.a;
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { a: '1', b: '2' }
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
