# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$({ [(a = b?.c.d.e(1))]: 10 });
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const a /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
const tmpCalleeParam /*:object*/ = { [a]: 10 };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $dotCall($, { e: $ }, `e`, 1);
$({ [a]: 10 });
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { e: $ };
const b = $dotCall( $, a, "e", 1 );
const c = { [ b ]: 10 };
$( c );
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { 1: '10' }
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
