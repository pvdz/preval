# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Statement > Arr element > Auto ident nested simple member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
(b.x = b.x = b.x = b.x = b.x = b.x = c) +
  (b.x = b.x = b.x = b.x = b.x = b.x = c);
$(a, b, c);
`````


## Settled


`````js filename=intro
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { x: 3 };
$(a, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ a: 999, b: 1000 }, { x: 3 }, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = { x: 3 };
$( a, b, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
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
const tmpBinBothLhs = tmpInitAssignLhsComputedRhs;
const tmpInitAssignLhsComputedRhs$21 = c;
b.x = tmpInitAssignLhsComputedRhs$21;
const tmpInitAssignLhsComputedRhs$19 = tmpInitAssignLhsComputedRhs$21;
b.x = tmpInitAssignLhsComputedRhs$19;
const tmpInitAssignLhsComputedRhs$17 = tmpInitAssignLhsComputedRhs$19;
b.x = tmpInitAssignLhsComputedRhs$17;
const tmpInitAssignLhsComputedRhs$15 = tmpInitAssignLhsComputedRhs$17;
b.x = tmpInitAssignLhsComputedRhs$15;
const tmpInitAssignLhsComputedRhs$13 = tmpInitAssignLhsComputedRhs$15;
b.x = tmpInitAssignLhsComputedRhs$13;
const tmpInitAssignLhsComputedRhs$11 = tmpInitAssignLhsComputedRhs$13;
b.x = tmpInitAssignLhsComputedRhs$11;
const tmpBinBothRhs = tmpInitAssignLhsComputedRhs$11;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b, c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
