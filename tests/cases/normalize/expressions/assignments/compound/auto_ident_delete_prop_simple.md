# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Assignments > Compound > Auto ident delete prop simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a *= delete arg.y));
$(a, arg);
`````


## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const tmpBinBothRhs /*:boolean*/ = delete arg.y;
const a /*:object*/ = { a: 999, b: 1000 };
const tmpClusterSSA_a /*:number*/ = a * tmpBinBothRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const tmpBinBothRhs = delete arg.y;
const tmpClusterSSA_a = { a: 999, b: 1000 } * tmpBinBothRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = delete a.y;
const c = {
  a: 999,
  b: 1000,
};
const d = c * b;
$( d );
$( d, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: NaN, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
