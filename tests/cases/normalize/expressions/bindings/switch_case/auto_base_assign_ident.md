# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Bindings > Switch case > Auto base assign ident
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = 1;

    let a = (b = $(2));
    $(a, b);
}
`````

## Settled


`````js filename=intro
const tmpNestedComplexRhs /*:unknown*/ = $(2);
$(tmpNestedComplexRhs, tmpNestedComplexRhs);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedComplexRhs = $(2);
$(tmpNestedComplexRhs, tmpNestedComplexRhs);
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let b;
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    b = 1;
    a = b = $(2);
    $(a, b);
  } else {
  }
}
`````

## Normalized


`````js filename=intro
let b = undefined;
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  b = 1;
  const tmpNestedComplexRhs = $(2);
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs, b);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( a, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
