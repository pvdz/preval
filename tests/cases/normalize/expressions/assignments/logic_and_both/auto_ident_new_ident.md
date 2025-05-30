# Preval test case

# auto_ident_new_ident.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident new ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = new $(1)) && (a = new $(1)));
$(a);
`````


## Settled


`````js filename=intro
new $(1);
const tmpNestedComplexRhs /*:object*/ = new $(1);
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
new $(1);
const tmpNestedComplexRhs = new $(1);
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
new $( 1 );
const a = new $( 1 );
$( a );
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
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
