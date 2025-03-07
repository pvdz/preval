# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Switch default > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = ($(1), $(2), $(x));
}
$(a, x);
`````

## Settled


`````js filename=intro
$(1);
$(1);
$(2);
const a /*:unknown*/ = $(1);
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(1);
$(2);
$($(1), 1);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    a = ($(1), $(2), $(x));
  } else {
  }
}
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
$(1);
$(2);
a = $(x);
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 1 );
$( 2 );
const a = $( 1 );
$( a, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
