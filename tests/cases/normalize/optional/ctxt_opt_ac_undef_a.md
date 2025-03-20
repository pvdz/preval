# Preval test case

# ctxt_opt_ac_undef_a.md

> Normalize > Optional > Ctxt opt ac undef a
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = undefined;
$($(a)?.b.c?.(100));
`````


## Settled


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $(undefined);
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
const tmpChainElementCall = $(undefined);
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
const a = $( undefined );
const b = a == null;
if (b) {
  $( undefined );
}
else {
  const c = a.b;
  const d = c.c;
  const e = d == null;
  if (e) {
    $( undefined );
  }
  else {
    const f = $dotCall( d, c, "c", 100 );
    $( f );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
