# Preval test case

# auto_ident_call_computed_s-seq_simple.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident call computed s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = (1, 2, b)["$"](1)):
}
$(a);
`````

## Settled


`````js filename=intro
$(1);
const b /*:object*/ = { $: $ };
const a /*:unknown*/ = b.$(1);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$({ $: $ }.$(1));
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === (a = (1, 2, b)[`\$`](1))) {
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpCallObj = b;
a = tmpCallObj.$(1);
let tmpBinBothRhs = a;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = { $: $ };
const b = a.$( 1 );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
