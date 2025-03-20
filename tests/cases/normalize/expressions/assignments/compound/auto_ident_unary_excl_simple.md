# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Compound > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a *= !arg));
$(a, arg);
`````


## Settled


`````js filename=intro
const a /*:object*/ = { a: 999, b: 1000 };
const tmpClusterSSA_a /*:number*/ = a * 0;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = { a: 999, b: 1000 } * 0;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = a * 0;
$( b );
$( b, 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: NaN, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
