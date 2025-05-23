# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Assignments > Compound > Auto ident nested simple member assigns
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
$((a *= b.x = b.x = b.x = b.x = b.x = b.x = c));
$(a, b, c);
`````


## Settled


`````js filename=intro
const a /*:object*/ = { a: 999, b: 1000 };
const tmpClusterSSA_a /*:number*/ = a * 3;
$(tmpClusterSSA_a);
const b /*:object*/ = { x: 3 };
$(tmpClusterSSA_a, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = { a: 999, b: 1000 } * 3;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, { x: 3 }, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = a * 3;
$( b );
const c = { x: 3 };
$( b, c, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
const tmpInitAssignLhsComputedRhs$9 = c;
b.x = tmpInitAssignLhsComputedRhs$9;
const tmpInitAssignLhsComputedRhs$7 = tmpInitAssignLhsComputedRhs$9;
b.x = tmpInitAssignLhsComputedRhs$7;
const tmpInitAssignLhsComputedRhs$5 = tmpInitAssignLhsComputedRhs$7;
b.x = tmpInitAssignLhsComputedRhs$5;
const tmpInitAssignLhsComputedRhs$3 = tmpInitAssignLhsComputedRhs$5;
b.x = tmpInitAssignLhsComputedRhs$3;
const tmpInitAssignLhsComputedRhs$1 = tmpInitAssignLhsComputedRhs$3;
b.x = tmpInitAssignLhsComputedRhs$1;
const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
b.x = tmpInitAssignLhsComputedRhs;
const tmpBinBothRhs = tmpInitAssignLhsComputedRhs;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(a);
$(a, b, c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: NaN, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
