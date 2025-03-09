# Preval test case

# ctxt_opt_ab_undef_b.md

> Normalize > Optional > Ctxt opt ab undef b
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {};
$($(a)?.b?.c(100));
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
const tmpChainElementCall = $({});
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

## Pre Normal


`````js filename=intro
const a = {};
$($(a)?.b?.c(100));
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
    const tmpChainElementCall$1 = tmpChainElementObject.c(100);
    tmpCalleeParam = tmpChainElementCall$1;
    $(tmpChainElementCall$1);
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
const a = {};
const b = $( a );
const c = b == null;
if (c) {
  $( undefined );
}
else {
  const d = b.b;
  const e = d == null;
  if (e) {
    $( undefined );
  }
  else {
    const f = d.c( 100 );
    $( f );
  }
}
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
