# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Switch case block > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = typeof x;
  }
}
$(a, x);
`````


## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(`number`, 1);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, 1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === $(1)) {
  $(`number`, 1);
} else {
  $({ a: 999, b: 1000 }, 1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  $( "number", 1 );
}
else {
  const d = {
    a: 999,
    b: 1000,
  };
  $( d, 1 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
