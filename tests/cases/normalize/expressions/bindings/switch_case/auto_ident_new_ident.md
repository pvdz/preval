# Preval test case

# auto_ident_new_ident.md

> Normalize > Expressions > Bindings > Switch case > Auto ident new ident
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = new $(1);
    $(a);
}
`````

## Settled


`````js filename=intro
const a /*:object*/ = new $(1);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(new $(1));
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    a = new $(1);
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
  a = new $(1);
  $(a);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
