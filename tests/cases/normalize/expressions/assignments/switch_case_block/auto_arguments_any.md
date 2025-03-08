# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Switch case block > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = arguments;
  }
}
$(a);
`````

## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(arguments);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === $(1)) {
  $(arguments);
} else {
  $({ a: 999, b: 1000 });
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    {
      a = arguments;
    }
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  a = arguments;
} else {
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  $( arguments );
}
else {
  const d = {
    a: 999,
    b: 1000,
  };
  $( d );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

arguments

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: '<Global Arguments>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
