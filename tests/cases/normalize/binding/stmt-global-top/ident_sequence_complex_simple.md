# Preval test case

# ident_sequence_complex_simple.md

> Normalize > Binding > Stmt-global-top > Ident sequence complex simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = 2, c = 3;
let a = ($(b), $(c)).x = c;
$(a, b, c);
`````

## Settled


`````js filename=intro
$(2);
const varInitAssignLhsComputedObj /*:unknown*/ = $(3);
varInitAssignLhsComputedObj.x = 3;
$(3, 2, 3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
const varInitAssignLhsComputedObj = $(3);
varInitAssignLhsComputedObj.x = 3;
$(3, 2, 3);
`````

## Pre Normal


`````js filename=intro
let b = 2,
  c = 3;
let a = (($(b), $(c)).x = c);
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 2;
let c = 3;
$(b);
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedRhs = c;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs, b, c);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 2 );
const a = $( 3 );
a.x = 3;
$( 3, 2, 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 3
 - eval returned: ("<crash[ Cannot create property 'x' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
