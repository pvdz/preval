# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$((a = b?.c.d.e(1)) || (a = b?.c.d.e(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpChainElementCall /*:unknown*/ = tmpObjLitVal$1.e(1);
if (tmpChainElementCall) {
  $(tmpChainElementCall);
  $(tmpChainElementCall);
} else {
  const tmpChainElementCall$1 /*:unknown*/ = tmpObjLitVal$1.e(1);
  $(tmpChainElementCall$1);
  $(tmpChainElementCall$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpChainElementCall = tmpObjLitVal$1.e(1);
if (tmpChainElementCall) {
  $(tmpChainElementCall);
  $(tmpChainElementCall);
} else {
  const tmpChainElementCall$1 = tmpObjLitVal$1.e(1);
  $(tmpChainElementCall$1);
  $(tmpChainElementCall$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { e: $ };
const b = a.e( 1 );
if (b) {
  $( b );
  $( b );
}
else {
  const c = a.e( 1 );
  $( c );
  $( c );
}
`````


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
