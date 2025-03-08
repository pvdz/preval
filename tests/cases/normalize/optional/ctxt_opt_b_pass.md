# Preval test case

# ctxt_opt_b_pass.md

> Normalize > Optional > Ctxt opt b pass
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {b: {c: $}};
$($(a).b?.c(100));
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = { c: $ };
const a /*:object*/ = { b: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(a);
const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.b;
const tmpIfTest /*:boolean*/ = tmpChainElementObject == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementCall$1 /*:unknown*/ = tmpChainElementObject.c(100);
  $(tmpChainElementCall$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = { c: $ };
const tmpChainElementObject = $({ b: tmpObjLitVal }).b;
if (tmpChainElementObject == null) {
  $(undefined);
} else {
  $(tmpChainElementObject.c(100));
}
`````

## Pre Normal


`````js filename=intro
const a = { b: { c: $ } };
$($(a).b?.c(100));
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { c: $ };
const a = { b: tmpObjLitVal };
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(a);
const tmpChainElementObject = tmpChainElementCall.b;
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = tmpChainElementObject.c(100);
  tmpCalleeParam = tmpChainElementCall$1;
} else {
}
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = { b: a };
const c = $( b );
const d = c.b;
const e = d == null;
if (e) {
  $( undefined );
}
else {
  const f = d.c( 100 );
  $( f );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { b: '{"c":"\\"<$>\\""}' }
 - 2: 100
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
