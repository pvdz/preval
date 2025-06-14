# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Assignments > Switch default > Auto ident computed s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = (1, 2, b)[$("c")];
}
$(a, b);
`````


## Settled


`````js filename=intro
$(1);
const tmpAssignRhsCompProp /*:unknown*/ = $(`c`);
const b /*:object*/ /*truthy*/ = { c: 1 };
const a /*:unknown*/ = b[tmpAssignRhsCompProp];
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpAssignRhsCompProp = $(`c`);
const b = { c: 1 };
$(b[tmpAssignRhsCompProp], b);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
$( c, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpAssignRhsCompObj = b;
const tmpAssignRhsCompProp = $(`c`);
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'c'
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
