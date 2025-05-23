# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Assignments > Switch default > Auto ident prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = (1, 2, $(b)).c;
}
$(a, b);
`````


## Settled


`````js filename=intro
$(1);
const b /*:object*/ = { c: 1 };
const tmpAssignRhsProp /*:unknown*/ = $(b);
const a /*:unknown*/ = tmpAssignRhsProp.c;
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const b = { c: 1 };
$($(b).c, b);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = { c: 1 };
const b = $( a );
const c = b.c;
$( c, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpAssignRhsProp = $(b);
a = tmpAssignRhsProp.c;
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { c: '1' }
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
