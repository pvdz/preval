# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Label > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
label: a = b?.c.d.e(1);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpChainElementCall /*:unknown*/ = tmpObjLitVal$1.e(1);
$(tmpChainElementCall);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ e: $ }.e(1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { e: $ };
const b = a.e( 1 );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
