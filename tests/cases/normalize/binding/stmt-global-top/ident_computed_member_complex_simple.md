# Preval test case

# ident_computed_member_complex_simple.md

> Normalize > Binding > Stmt-global-top > Ident computed member complex simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = {x: 2}, c = 3;
let a = $(b)[$('x')] = c;
$(a, b, c);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 2 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
$(3, b, 3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 2 };
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
$(3, b, 3);
`````

## Pre Normal


`````js filename=intro
let b = { x: 2 },
  c = 3;
let a = ($(b)[$(`x`)] = c);
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = { x: 2 };
let c = 3;
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedRhs = c;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs, b, c);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 2 };
const b = $( a );
const c = $( "x" );
b[c] = 3;
$( 3, a, 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '2' }
 - 2: 'x'
 - 3: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
