# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = 1;

    let a = $(b);
    $(a, b);
}
`````

## Settled


`````js filename=intro
const tmpClusterSSA_a /*:unknown*/ = $(1);
$(tmpClusterSSA_a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1), 1);
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let b;
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    b = 1;
    a = $(b);
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
  a = $(b);
  $(a, b);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
