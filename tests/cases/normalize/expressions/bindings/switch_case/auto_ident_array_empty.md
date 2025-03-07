# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Bindings > Switch case > Auto ident array empty
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = [];
    $(a);
}
`````

## Settled


`````js filename=intro
const a /*:array*/ = [];
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([]);
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    a = [];
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
  a = [];
  $(a);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
