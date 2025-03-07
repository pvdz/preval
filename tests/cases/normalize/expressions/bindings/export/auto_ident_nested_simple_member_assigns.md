# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Bindings > Export > Auto ident nested simple member assigns
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

export let a = (b.x = b.x = b.x = b.x = b.x = b.x = c);
$(a, b, c);
`````

## Settled


`````js filename=intro
const a /*:number*/ = 3;
export { a };
const b /*:object*/ = { x: 3 };
$(3, b, 3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = 3;
export { a };
$(3, { x: 3 }, 3);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = (b.x = b.x = b.x = b.x = b.x = b.x = c);
export { a };
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = 3;
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
let a = varInitAssignLhsComputedRhs;
export { a };
$(a, b, c);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 3;
export { a as a };
const b = { x: 3 };
$( 3, b, 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
