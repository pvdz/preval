# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = b?.c.d.e(1)):
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpChainElementCall /*:unknown*/ = tmpObjLitVal$1.e(1);
$(tmpChainElementCall);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$({ e: $ }.e(1));
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = { e: $ };
const b = a.e( 1 );
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
