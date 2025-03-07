# Preval test case

# ident_computed_member_simple_bin.md

> Normalize > Binding > Export-default > Ident computed member simple bin
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
export let a = b[$('x')] = c + d;
$(a, b, c);
`````

## Settled


`````js filename=intro
const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
const b /*:object*/ = { x: 2 };
b[varInitAssignLhsComputedProp] = 7;
const a /*:number*/ = 7;
export { a };
$(7, b, 3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const varInitAssignLhsComputedProp = $(`x`);
const b = { x: 2 };
b[varInitAssignLhsComputedProp] = 7;
const a = 7;
export { a };
$(7, b, 3);
`````

## Pre Normal


`````js filename=intro
let b = { x: 2 },
  c = 3,
  d = 4;
let a = (b[$(`x`)] = c + d);
export { a };
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = { x: 2 };
let c = 3;
let d = 4;
const varInitAssignLhsComputedObj = b;
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedRhs = c + d;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
export { a };
$(a, b, c);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "x" );
const b = { x: 2 };
b[a] = 7;
const c = 7;
export { c as a };
$( 7, b, 3 );
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
