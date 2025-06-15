# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident nested simple member assigns
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
$(
  (a = b.x = b.x = b.x = b.x = b.x = b.x = c) &&
    (a = b.x = b.x = b.x = b.x = b.x = b.x = c)
);
$(a, b, c);
`````


## Settled


`````js filename=intro
$(3);
const b /*:object*/ /*truthy*/ = { x: 3 };
$(3, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
$(3, { x: 3 }, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
const a = { x: 3 };
$( 3, a, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpInitAssignLhsComputedRhs$7 = c;
b.x = tmpInitAssignLhsComputedRhs$7;
const tmpInitAssignLhsComputedRhs$5 = tmpInitAssignLhsComputedRhs$7;
b.x = tmpInitAssignLhsComputedRhs$5;
const tmpInitAssignLhsComputedRhs$3 = tmpInitAssignLhsComputedRhs$5;
b.x = tmpInitAssignLhsComputedRhs$3;
const tmpInitAssignLhsComputedRhs$1 = tmpInitAssignLhsComputedRhs$3;
b.x = tmpInitAssignLhsComputedRhs$1;
const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
b.x = tmpInitAssignLhsComputedRhs;
const tmpNestedAssignPropRhs = tmpInitAssignLhsComputedRhs;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
b.x = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpInitAssignLhsComputedRhs$19 = c;
  b.x = tmpInitAssignLhsComputedRhs$19;
  const tmpInitAssignLhsComputedRhs$17 = tmpInitAssignLhsComputedRhs$19;
  b.x = tmpInitAssignLhsComputedRhs$17;
  const tmpInitAssignLhsComputedRhs$15 = tmpInitAssignLhsComputedRhs$17;
  b.x = tmpInitAssignLhsComputedRhs$15;
  const tmpInitAssignLhsComputedRhs$13 = tmpInitAssignLhsComputedRhs$15;
  b.x = tmpInitAssignLhsComputedRhs$13;
  const tmpInitAssignLhsComputedRhs$11 = tmpInitAssignLhsComputedRhs$13;
  b.x = tmpInitAssignLhsComputedRhs$11;
  const tmpInitAssignLhsComputedRhs$9 = tmpInitAssignLhsComputedRhs$11;
  b.x = tmpInitAssignLhsComputedRhs$9;
  const tmpNestedComplexRhs = tmpInitAssignLhsComputedRhs$9;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b, c);
} else {
  $(tmpCalleeParam);
  $(a, b, c);
}
`````


## Todos triggered


- (todo) free with zero args, we can eliminate this?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
