# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Assignments > Binary left > Auto ident new ident complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new $($(1), $(2))) + $(100));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpCalleeParam$3 /*:unknown*/ = $(2);
const a /*:object*/ = new $(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = a + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
const a = new $(tmpCalleeParam$1, tmpCalleeParam$3);
$(a + $(100));
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = new $( a, b );
const d = $( 100 );
const e = c + d;
$( e );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 100
 - 5: '[object Object]100'
 - 6: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
