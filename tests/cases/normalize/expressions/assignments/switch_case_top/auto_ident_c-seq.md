# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Switch case top > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = ($(1), $(2), $(x));
}
$(a, x);
`````

## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpClusterSSA_a /*:unknown*/ = $(1);
  $(tmpClusterSSA_a, 1);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, 1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === $(1)) {
  $(1);
  $(2);
  $($(1), 1);
} else {
  $({ a: 999, b: 1000 }, 1);
}
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
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
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  $(1);
  $(2);
  a = $(x);
} else {
}
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  $( 1 );
  $( 2 );
  const d = $( 1 );
  $( d, 1 );
}
else {
  const e = {
    a: 999,
    b: 1000,
  };
  $( e, 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 1
 - 6: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
