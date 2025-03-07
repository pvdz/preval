# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Assignments > Switch default > Auto ident delete prop simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = delete arg.y;
}
$(a, arg);
`````

## Settled


`````js filename=intro
$(1);
const arg /*:object*/ = { y: 1 };
const a /*:boolean*/ = delete arg.y;
$(a, arg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const arg = { y: 1 };
$(delete arg.y, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    a = delete arg.y;
  } else {
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
a = delete arg.y;
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = { y: 1 };
const b = delete a.y;
$( b, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
