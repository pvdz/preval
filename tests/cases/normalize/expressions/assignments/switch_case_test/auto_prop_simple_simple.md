# Preval test case

# auto_prop_simple_simple.md

> Normalize > Expressions > Assignments > Switch case test > Auto prop simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = { b: $(1) }):
}
a.b = 2;
$(a);
`````


## Settled


`````js filename=intro
$(1);
$(1);
const a /*:object*/ /*truthy*/ = { b: 2 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(1);
$({ b: 2 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 1 );
const a = { b: 2 };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
const tmpBinBothRhs = a;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
a.b = 2;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
