# Preval test case

# ctxt_opt_c_undef_c.md

> Normalize > Optional > Ctxt opt c undef c
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {b: {}};
$($(a).b.c?.(100));
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = {};
const a /*:object*/ = { b: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(a);
const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.b;
const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.c;
const tmpIfTest /*:boolean*/ = tmpChainElementObject$1 == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 100);
  $(tmpChainElementCall$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = {};
const tmpChainElementObject = $({ b: tmpObjLitVal }).b;
const tmpChainElementObject$1 = tmpChainElementObject.c;
if (tmpChainElementObject$1 == null) {
  $(undefined);
} else {
  $($dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 100));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = { b: a };
const c = $( b );
const d = c.b;
const e = d.c;
const f = e == null;
if (f) {
  $( undefined );
}
else {
  const g = $dotCall( e, d, "c", 100 );
  $( g );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { b: '{}' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
