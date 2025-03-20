# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Assignments > Switch default > Auto ident computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = $(b)[$("c")];
}
$(a, b);
`````


## Settled


`````js filename=intro
$(1);
const b /*:object*/ = { c: 1 };
const tmpAssignRhsCompObj /*:unknown*/ = $(b);
const tmpAssignRhsCompProp /*:unknown*/ = $(`c`);
const tmpClusterSSA_a /*:unknown*/ = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
$(tmpClusterSSA_a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const b = { c: 1 };
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $(`c`);
$(tmpAssignRhsCompObj[tmpAssignRhsCompProp], b);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
const d = b[ c ];
$( d, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { c: '1' }
 - 3: 'c'
 - 4: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
