# Preval test case

# ctxt_opt_ab_undef_c.md

> Normalize > Optional > Ctxt opt ab undef c
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {b: {}};
$($(a)?.b?.c(100));
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = {};
const a /*:object*/ = { b: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(a);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.b;
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$1) {
    $(undefined);
  } else {
    const tmpChainElementCall$1 /*:unknown*/ = tmpChainElementObject.c(100);
    $(tmpChainElementCall$1);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = {};
const tmpChainElementCall = $({ b: tmpObjLitVal });
if (tmpChainElementCall == null) {
  $(undefined);
} else {
  const tmpChainElementObject = tmpChainElementCall.b;
  if (tmpChainElementObject == null) {
    $(undefined);
  } else {
    $(tmpChainElementObject.c(100));
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = { b: a };
const c = $( b );
const d = c == null;
if (d) {
  $( undefined );
}
else {
  const e = c.b;
  const f = e == null;
  if (f) {
    $( undefined );
  }
  else {
    const g = e.c( 100 );
    $( g );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { b: '{}' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
