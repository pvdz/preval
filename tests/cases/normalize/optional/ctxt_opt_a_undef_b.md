# Preval test case

# ctxt_opt_a_undef_b.md

> Normalize > Optional > Ctxt opt a undef b
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {};
$($(a)?.b.c(100));
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
  const tmpChainElementCall$1 /*:unknown*/ = tmpChainElementObject.c(100);
  $(tmpChainElementCall$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $({});
if (tmpChainElementCall == null) {
  $(undefined);
} else {
  $(tmpChainElementCall.b.c(100));
}
`````

## Pre Normal


`````js filename=intro
const a = {};
$($(a)?.b.c(100));
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
  const tmpChainElementCall$1 = tmpChainElementObject.c(100);
  tmpCalleeParam = tmpChainElementCall$1;
  $(tmpChainElementCall$1);
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
  const e = d.c( 100 );
  $( e );
}
`````

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
