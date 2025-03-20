# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Assignments > Compound > Auto ident opt extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
$((a *= b?.x.y.z));
$(a);
`````


## Settled


`````js filename=intro
const a /*:object*/ = { a: 999, b: 1000 };
const tmpClusterSSA_a$1 /*:number*/ = a * 100;
$(tmpClusterSSA_a$1);
$(tmpClusterSSA_a$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a$1 = { a: 999, b: 1000 } * 100;
$(tmpClusterSSA_a$1);
$(tmpClusterSSA_a$1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = a * 100;
$( b );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
