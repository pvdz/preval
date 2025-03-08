# Preval test case

# ctxt_opt_ac_undef_c.md

> Normalize > Optional > Ctxt opt ac undef c
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {b: {}};
$($(a)?.b.c?.(100));
`````

## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
const tmpObjLitVal /*:object*/ = {};
const a /*:object*/ = { b: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(a);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.b;
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
const tmpObjLitVal = {};
const tmpChainElementCall = $({ b: tmpObjLitVal });
if (!(tmpChainElementCall == null)) {
  const tmpChainElementObject = tmpChainElementCall.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  if (!(tmpChainElementObject$1 == null)) {
    tmpCalleeParam = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`, 100);
  }
}
$(tmpCalleeParam);
`````

## Pre Normal


`````js filename=intro
const a = { b: {} };
$($(a)?.b.c?.(100));
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
const b = {};
const c = { b: b };
const d = $( c );
const e = d == null;
if (e) {

}
else {
  const f = d.b;
  const g = f.c;
  const h = g == null;
  if (h) {

  }
  else {
    const i = $dotCall( g, f, "c", 100 );
    a = i;
  }
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { b: '{}' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
