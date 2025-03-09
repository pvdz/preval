# Preval test case

# ctxt_opt_a_undef_c.md

> Normalize > Optional > Ctxt opt a undef c
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {b: {}};
$($(a)?.b.c(100));
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
  const tmpChainElementCall$1 /*:unknown*/ = tmpChainElementObject.c(100);
  $(tmpChainElementCall$1);
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
  $(tmpChainElementCall.b.c(100));
}
`````

## Pre Normal


`````js filename=intro
const a = { b: {} };
$($(a)?.b.c(100));
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = {};
const a = { b: tmpObjLitVal };
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
const b = { b: a };
const c = $( b );
const d = c == null;
if (d) {
  $( undefined );
}
else {
  const e = c.b;
  const f = e.c( 100 );
  $( f );
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
