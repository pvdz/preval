# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident call ident complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$({ [(a = $($(1), $(2)))]: 10 });
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpCalleeParam$3 /*:unknown*/ = $(2);
const a /*:unknown*/ = $(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpCalleeParam /*:object*/ /*truthy*/ = { [a]: 10 };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(1), $(2));
$({ [a]: 10 });
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = $( a, b );
const d = { [ c ]: 10 };
$( d );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpCalleeParam$1 = $(1);
let tmpCalleeParam$3 = $(2);
a = $(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
let tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
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
 - 4: { 1: '10' }
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
