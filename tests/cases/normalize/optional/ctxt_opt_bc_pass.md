# Preval test case

# ctxt_opt_bc_pass.md

> Normalize > Optional > Ctxt opt bc pass
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {b: {c: $}};
$($(a).b?.c?.(100));
`````

## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
const tmpObjLitVal /*:object*/ = { c: $ };
const a /*:object*/ = { b: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(a);
const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.b;
const tmpIfTest /*:boolean*/ = tmpChainElementObject == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.c;
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject$1 == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 100);
    tmpCalleeParam = tmpChainElementCall$1;
  }
}
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpObjLitVal = { c: $ };
const tmpChainElementObject = $({ b: tmpObjLitVal }).b;
if (!(tmpChainElementObject == null)) {
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  if (!(tmpChainElementObject$1 == null)) {
    tmpCalleeParam = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 100);
  }
}
$(tmpCalleeParam);
`````

## Pre Normal


`````js filename=intro
const a = { b: { c: $ } };
$($(a).b?.c?.(100));
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
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 100);
    tmpCalleeParam = tmpChainElementCall$1;
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
const b = { c: $ };
const c = { b: b };
const d = $( c );
const e = d.b;
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
$( a );
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
