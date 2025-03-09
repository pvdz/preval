# Preval test case

# ctxt_opt_abc_undef_a.md

> Normalize > Optional > Ctxt opt abc undef a
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = undefined;
$($(a)?.b?.c?.(100));
`````

## Settled


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $(undefined);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.b;
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$1) {
    $(undefined);
  } else {
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.c;
    const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject$1 == null;
    if (tmpIfTest$3) {
      $(undefined);
    } else {
      const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 100);
      $(tmpChainElementCall$1);
    }
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
  if (tmpChainElementObject == null) {
    $(undefined);
  } else {
    const tmpChainElementObject$1 = tmpChainElementObject.c;
    if (tmpChainElementObject$1 == null) {
      $(undefined);
    } else {
      $($dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 100));
    }
  }
}
`````

## Pre Normal


`````js filename=intro
const a = undefined;
$($(a)?.b?.c?.(100));
`````

## Normalized


`````js filename=intro
const a = undefined;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(a);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.b;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementObject.c;
    const tmpIfTest$3 = tmpChainElementObject$1 != null;
    if (tmpIfTest$3) {
      const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 100);
      tmpCalleeParam = tmpChainElementCall$1;
      $(tmpChainElementCall$1);
    } else {
      $(tmpCalleeParam);
    }
  } else {
    $(tmpCalleeParam);
  }
} else {
  $(tmpCalleeParam);
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
  const d = c == null;
  if (d) {
    $( undefined );
  }
  else {
    const e = c.c;
    const f = e == null;
    if (f) {
      $( undefined );
    }
    else {
      const g = $dotCall( e, c, "c", 100 );
      $( g );
    }
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
