# Preval test case

# auto_ident_new_prop_s-seq.md

> Normalize > Expressions > Assignments > Arr element > Auto ident new prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new (1, 2, b).$(1)) + (a = new (1, 2, b).$(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_a /*:object*/ = new $(1);
const tmpClusterSSA_a$1 /*:object*/ = new $(1);
const tmpCalleeParam /*:primitive*/ = tmpClusterSSA_a + tmpClusterSSA_a$1;
$(tmpCalleeParam);
$(tmpClusterSSA_a$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = new $(1);
const tmpClusterSSA_a$1 = new $(1);
$(tmpClusterSSA_a + tmpClusterSSA_a$1);
$(tmpClusterSSA_a$1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
const b = new $( 1 );
const c = a + b;
$( c );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: '[object Object][object Object]'
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
