# Preval test case

# auto_ident_computed_simple_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident computed simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 1 };

    let a = b["c"];
    $(a, b);
}
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
$(1, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, { c: 1 });
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let b;
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    b = { c: 1 };
    a = b[`c`];
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
  b = { c: 1 };
  a = b.c;
  $(a, b);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
$( 1, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
