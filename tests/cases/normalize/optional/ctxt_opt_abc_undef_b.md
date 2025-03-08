# Preval test case

# ctxt_opt_abc_undef_b.md

> Normalize > Optional > Ctxt opt abc undef b
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {};
$($(a)?.b?.c?.(100));
`````

## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
const a /*:object*/ = {};
const tmpChainElementCall /*:unknown*/ = $(a);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.b;
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.c;
    const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject$1 == null;
    if (tmpIfTest$3) {
    } else {
      const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 100);
      tmpCalleeParam = tmpChainElementCall$1;
    }
  }
}
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpChainElementCall = $({});
if (!(tmpChainElementCall == null)) {
  const tmpChainElementObject = tmpChainElementCall.b;
  if (!(tmpChainElementObject == null)) {
    const tmpChainElementObject$1 = tmpChainElementObject.c;
    if (!(tmpChainElementObject$1 == null)) {
      tmpCalleeParam = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 100);
    }
  }
}
$(tmpCalleeParam);
`````

## Pre Normal


`````js filename=intro
const a = {};
$($(a)?.b?.c?.(100));
`````

## Normalized


`````js filename=intro
const a = {};
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
    } else {
    }
  } else {
  }
} else {
}
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = {};
const c = $( b );
const d = c == null;
if (d) {

}
else {
  const e = c.b;
  const f = e == null;
  if (f) {

  }
  else {
    const g = e.c;
    const h = g == null;
    if (h) {

    }
    else {
      const i = $dotCall( g, e, "c", 100 );
      a = i;
    }
  }
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
