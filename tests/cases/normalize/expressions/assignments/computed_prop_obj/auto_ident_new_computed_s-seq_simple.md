# Preval test case

# auto_ident_new_computed_s-seq_simple.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident new computed s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
(a = new (1, 2, b)["$"](1))["a"];
$(a);
`````


## Settled


`````js filename=intro
const a /*:object*/ = new $(1);
a.a;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = new $(1);
a.a;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
a.a;
$( a );
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
