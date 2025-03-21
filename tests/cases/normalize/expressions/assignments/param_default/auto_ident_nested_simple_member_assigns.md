# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Assignments > Param default > Auto ident nested simple member assigns
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
function f(p = (a = b.x = b.x = b.x = b.x = b.x = b.x = c)) {}
$(f());
$(a, b, c);
`````

## Settled


`````js filename=intro
$(undefined);
const b /*:object*/ = { x: 3 };
$(3, b, 3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(3, { x: 3 }, 3);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = b.x = b.x = b.x = b.x = b.x = b.x = c) : tmpParamBare;
};
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
$(f());
$(a, b, c);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
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
    const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b, c);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
const a = { x: 3 };
$( 3, a, 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - 2: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
