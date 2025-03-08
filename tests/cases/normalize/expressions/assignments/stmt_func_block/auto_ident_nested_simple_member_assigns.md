# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident nested simple member assigns
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = { x: 1 },
      c = 3;

    let a = { a: 999, b: 1000 };
    a = b.x = b.x = b.x = b.x = b.x = b.x = c;
    $(a, b, c);
  }
}
$(f());
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 3 };
$(3, b, 3);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3, { x: 3 }, 3);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let b = { x: 1 },
      c = 3;
    let a = { a: 999, b: 1000 };
    a = b.x = b.x = b.x = b.x = b.x = b.x = c;
    $(a, b, c);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let c = 3;
  let a = { a: 999, b: 1000 };
  const varInitAssignLhsComputedRhs$7 = c;
  b.x = varInitAssignLhsComputedRhs$7;
  const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$7;
  b.x = varInitAssignLhsComputedRhs$5;
  const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$5;
  b.x = varInitAssignLhsComputedRhs$3;
  const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
  b.x = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  b.x = varInitAssignLhsComputedRhs;
  const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  b.x = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  $(tmpNestedPropAssignRhs, b, c);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 3 };
$( 3, a, 3 );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 3, { x: '3' }, 3
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
