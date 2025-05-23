# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident object empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = {}):
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const a /*:object*/ = {};
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$({});
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = {};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
a = {};
const tmpBinBothRhs = a;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
