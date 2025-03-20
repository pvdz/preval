# Preval test case

# auto_ident_call_prop_s-seq.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident call prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$({ x: (a = (1, 2, b).$(1)) });
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const a /*:unknown*/ = b.$(1);
const tmpCalleeParam /*:object*/ = { x: a };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = { $: $ }.$(1);
$({ x: a });
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = a.$( 1 );
const c = { x: b };
$( c );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
