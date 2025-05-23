# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = !arg):
}
$(a, arg);
`````


## Settled


`````js filename=intro
$(1);
$(false, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(false, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( false, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
a = !arg;
const tmpBinBothRhs = a;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a, arg);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: false, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
