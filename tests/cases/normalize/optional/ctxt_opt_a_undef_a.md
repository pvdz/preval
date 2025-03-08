# Preval test case

# ctxt_opt_a_undef_a.md

> Normalize > Optional > Ctxt opt a undef a
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = undefined;
$($(a)?.b.c(100));
`````

## Settled


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $(undefined);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.b;
  const tmpChainElementCall$1 /*:unknown*/ = tmpChainElementObject.c(100);
  $(tmpChainElementCall$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $(undefined);
if (tmpChainElementCall == null) {
  $(undefined);
} else {
  $(tmpChainElementCall.b.c(100));
}
`````

## Pre Normal


`````js filename=intro
const a = undefined;
$($(a)?.b.c(100));
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
  const tmpChainElementCall$1 = tmpChainElementObject.c(100);
  tmpCalleeParam = tmpChainElementCall$1;
} else {
}
$(tmpCalleeParam);
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
  const d = c.c( 100 );
  $( d );
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
