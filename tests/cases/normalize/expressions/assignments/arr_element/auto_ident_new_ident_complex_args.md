# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Assignments > Arr element > Auto ident new ident complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new $($(1), $(2))) + (a = new $($(1), $(2))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpCalleeParam$3 /*:unknown*/ = $(2);
const a /*:object*/ = new $(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpCalleeParam$5 /*:unknown*/ = $(1);
const tmpCalleeParam$7 /*:unknown*/ = $(2);
const tmpClusterSSA_a /*:object*/ = new $(tmpCalleeParam$5, tmpCalleeParam$7);
const tmpCalleeParam /*:primitive*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
const a = new $(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpCalleeParam$5 = $(1);
const tmpCalleeParam$7 = $(2);
const tmpClusterSSA_a = new $(tmpCalleeParam$5, tmpCalleeParam$7);
$(a + tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = new $( a, b );
const d = $( 1 );
const e = $( 2 );
const f = new $( d, e );
const g = c + f;
$( g );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = $;
let tmpCalleeParam$1 = $(1);
let tmpCalleeParam$3 = $(2);
a = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpBinBothLhs = a;
const tmpNewCallee$1 = $;
let tmpCalleeParam$5 = $(1);
let tmpCalleeParam$7 = $(2);
a = new tmpNewCallee$1(tmpCalleeParam$5, tmpCalleeParam$7);
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - 5: 2
 - 6: 1, 2
 - 7: '[object Object][object Object]'
 - 8: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
