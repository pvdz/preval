# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Switch default > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = "foo";
}
$(a);
`````

## Settled


`````js filename=intro
$(1);
$(`foo`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(`foo`);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    a = `foo`;
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
a = `foo`;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( "foo" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
