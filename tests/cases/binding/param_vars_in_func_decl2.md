# Preval test case

# param_vars_in_func_decl2.md

> Binding > Param vars in func decl2
>
> Param that also has a var in same scope. Prettier (minified) does this.

## Input

`````js filename=intro
let m = undefined;
const a = undefined;
const tmpClusterSSA_a = $(10);
const b = $(20);
const t = [ tmpClusterSSA_a, b ];
m = t;
$(m);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_a /*:unknown*/ = $(10);
const b /*:unknown*/ = $(20);
const t /*:array*/ = [tmpClusterSSA_a, b];
$(t);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = $(10);
const b = $(20);
$([tmpClusterSSA_a, b]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
const b = $( 20 );
const c = [ a, b ];
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: [10, 20]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
