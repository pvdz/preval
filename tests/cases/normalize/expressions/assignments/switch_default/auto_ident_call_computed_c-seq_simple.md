# Preval test case

# auto_ident_call_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > Switch default > Auto ident call computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = (1, 2, $(b))["$"](1);
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const b /*:object*/ = { $: $ };
const tmpCallObj /*:unknown*/ = $(b);
const tmpClusterSSA_a /*:unknown*/ = tmpCallObj.$(1);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($({ $: $ }).$(1));
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = { $: $ };
const b = $( a );
const c = b.$( 1 );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { $: '"<$>"' }
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
