# Preval test case

# auto_ident_new_computed_s-seq_simple.md

> Normalize > Expressions > Assignments > Switch default > Auto ident new computed s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = new (1, 2, b)["$"](1);
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const a /*:object*/ = new $(1);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(new $(1));
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = new $( 1 );
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
