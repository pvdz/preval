# Preval test case

# auto_ident_call_computed_complex_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident call computed complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$({ [(a = $(b)["$"](1))]: 10 });
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCallObj /*:unknown*/ = $(b);
const tmpClusterSSA_a /*:unknown*/ = tmpCallObj.$(1);
const tmpCalleeParam /*:object*/ = { [tmpClusterSSA_a]: 10 };
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = $({ $: $ }).$(1);
$({ [tmpClusterSSA_a]: 10 });
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$( 1 );
const d = { [ c ]: 10 };
$( d );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: { 1: '10' }
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
