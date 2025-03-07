# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Switch default > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = [1, 2, 3];
}
$(a);
`````

## Settled


`````js filename=intro
$(1);
const a /*:array*/ = [1, 2, 3];
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$([1, 2, 3]);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    a = [1, 2, 3];
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
a = [1, 2, 3];
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = [ 1, 2, 3 ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
