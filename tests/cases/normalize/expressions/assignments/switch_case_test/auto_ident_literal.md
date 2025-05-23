# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = "foo"):
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


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( "foo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
a = `foo`;
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
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
