# Preval test case

# ctxt_opt_ac_undef_b.md

> Normalize > Optional > Ctxt opt ac undef b
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {};
$($(a)?.b.c?.(100));
`````


## Settled


`````js filename=intro
const a /*:object*/ = {};
const tmpChainElementCall /*:unknown*/ = $(a);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.b;
  const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.c;
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject$1 == null;
  if (tmpIfTest$1) {
    $(undefined);
  } else {
    const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 100);
    $(tmpChainElementCall$1);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $({});
if (tmpChainElementCall == null) {
  $(undefined);
} else {
  const tmpChainElementObject = tmpChainElementCall.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  if (tmpChainElementObject$1 == null) {
    $(undefined);
  } else {
    $($dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 100));
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = $( a );
const c = b == null;
if (c) {
  $( undefined );
}
else {
  const d = b.b;
  const e = d.c;
  const f = e == null;
  if (f) {
    $( undefined );
  }
  else {
    const g = $dotCall( e, d, "c", 100 );
    $( g );
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
