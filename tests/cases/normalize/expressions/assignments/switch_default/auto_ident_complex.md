# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Assignments > Switch default > Auto ident complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = $(b);
}
$(a, b);
`````


## Settled


`````js filename=intro
$(1);
const a /*:unknown*/ = $(1);
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($(1), 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 1 );
$( a, 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
