# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = ($(1), $(2), x)):
}
$(a, x);
`````

## Settled


`````js filename=intro
$(1);
$(1);
$(2);
$(1, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(1);
$(2);
$(1, 1);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === (a = ($(1), $(2), x))) {
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
const tmpBinBothLhs = tmpSwitchDisc;
$(1);
$(2);
a = x;
let tmpBinBothRhs = a;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 1 );
$( 2 );
$( 1, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
