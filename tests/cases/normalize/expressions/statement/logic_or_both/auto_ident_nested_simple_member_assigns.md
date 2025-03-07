# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Statement > Logic or both > Auto ident nested simple member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
(b.x = b.x = b.x = b.x = b.x = b.x = c) ||
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

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
(b.x = b.x = b.x = b.x = b.x = b.x = c) || (b.x = b.x = b.x = b.x = b.x = b.x = c);
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const varInitAssignLhsComputedRhs$9 = c;
b.x = varInitAssignLhsComputedRhs$9;
const varInitAssignLhsComputedRhs$7 = varInitAssignLhsComputedRhs$9;
b.x = varInitAssignLhsComputedRhs$7;
const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$7;
b.x = varInitAssignLhsComputedRhs$5;
const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$5;
b.x = varInitAssignLhsComputedRhs$3;
const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
b.x = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
b.x = varInitAssignLhsComputedRhs;
const tmpIfTest = varInitAssignLhsComputedRhs;
if (tmpIfTest) {
} else {
  const tmpAssignMemLhsObj = b;
  const varInitAssignLhsComputedRhs$19 = c;
  b.x = varInitAssignLhsComputedRhs$19;
  const varInitAssignLhsComputedRhs$17 = varInitAssignLhsComputedRhs$19;
  b.x = varInitAssignLhsComputedRhs$17;
  const varInitAssignLhsComputedRhs$15 = varInitAssignLhsComputedRhs$17;
  b.x = varInitAssignLhsComputedRhs$15;
  const varInitAssignLhsComputedRhs$13 = varInitAssignLhsComputedRhs$15;
  b.x = varInitAssignLhsComputedRhs$13;
  const varInitAssignLhsComputedRhs$11 = varInitAssignLhsComputedRhs$13;
  b.x = varInitAssignLhsComputedRhs$11;
  const tmpAssignMemRhs = varInitAssignLhsComputedRhs$11;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
}
$(a, b, c);
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
