# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Assignments > Compound > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a *= b--));
$(a, b);
`````


## Settled


`````js filename=intro
const a /*:object*/ = { a: 999, b: 1000 };
const tmpClusterSSA_a /*:number*/ = a * 1;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, 0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = { a: 999, b: 1000 } * 1;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, 0);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = a * 1;
$( b );
$( b, 0 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: NaN, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
