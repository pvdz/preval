# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident array simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = [1, 2, 3];
    $(a);
}
`````

## Settled


`````js filename=intro
const tmpClusterSSA_a /*:array*/ = [1, 2, 3];
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3]);
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    a = [1, 2, 3];
    $(a);
  } else {
  }
}
`````

## Normalized


`````js filename=intro
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  a = [1, 2, 3];
  $(a);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
