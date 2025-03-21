# Preval test case

# ident_sequence_complex_complex.md

> Normalize > Binding > For-a > Ident sequence complex complex
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (let a = ($(b), $(c)).x = $(c);false;) $(a, b, c);
`````

## Settled


`````js filename=intro
$(2);
const varInitAssignLhsComputedObj /*:unknown*/ = $(3);
const varInitAssignLhsComputedRhs /*:unknown*/ = $(3);
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
const varInitAssignLhsComputedObj = $(3);
varInitAssignLhsComputedObj.x = $(3);
`````

## Pre Normal


`````js filename=intro
let a = 1,
  b = 2,
  c = 3;
{
  let a$1 = (($(b), $(c)).x = $(c));
  while (false) {
    $(a$1, b, c);
  }
}
`````

## Normalized


`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
$(b);
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedRhs = $(c);
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
let a$1 = varInitAssignLhsComputedRhs;
`````

## PST Settled
With rename=true

`````js filename=intro
$( 2 );
const a = $( 3 );
const b = $( 3 );
a.x = b;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 3
 - 3: 3
 - eval returned: ("<crash[ Cannot create property 'x' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
