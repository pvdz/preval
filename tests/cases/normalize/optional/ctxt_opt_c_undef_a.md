# Preval test case

# ctxt_opt_c_undef_a.md

> Normalize > Optional > Ctxt opt c undef a
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = undefined;
$($(a).b.c?.(100));
`````

## Settled


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $(undefined);
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
const tmpChainElementObject = $(undefined).b;
const tmpChainElementObject$1 = tmpChainElementObject.c;
if (tmpChainElementObject$1 == null) {
  $(undefined);
} else {
  $($dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 100));
}
`````

## Pre Normal


`````js filename=intro
const a = undefined;
$($(a).b.c?.(100));
`````

## Normalized


`````js filename=intro
const a = undefined;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(a);
const tmpChainElementObject = tmpChainElementCall.b;
const tmpChainElementObject$1 = tmpChainElementObject.c;
const tmpIfTest = tmpChainElementObject$1 != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 100);
  tmpCalleeParam = tmpChainElementCall$1;
  $(tmpChainElementCall$1);
} else {
  $(tmpCalleeParam);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( undefined );
const b = a.b;
const c = b.c;
const d = c == null;
if (d) {
  $( undefined );
}
else {
  const e = $dotCall( c, b, "c", 100 );
  $( e );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
