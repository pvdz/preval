# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = /foo/):
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const a /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, ``);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(new $regex_constructor(`foo`, ``));
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = new $regex_constructor( "foo", "" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
a = new $regex_constructor(`foo`, ``);
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
