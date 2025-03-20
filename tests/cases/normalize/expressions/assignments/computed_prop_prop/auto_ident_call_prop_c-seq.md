# Preval test case

# auto_ident_call_prop_c-seq.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident call prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = (1, 2, $(b)).$(1))];
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCallObj /*:unknown*/ = $(b);
const tmpClusterSSA_a /*:unknown*/ = tmpCallObj.$(1);
const obj /*:object*/ = {};
obj[tmpClusterSSA_a];
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = $({ $: $ }).$(1);
({}[tmpClusterSSA_a]);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$( 1 );
const d = {};
d[ c ];
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
