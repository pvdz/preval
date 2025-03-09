# Preval test case

# double_coputed.md

> Normalize > Optional > Double coputed
>
> Order of complex expressions in double optional computed property

## Input

`````js filename=intro
let a = {x: {y: {z: 10}}};
$($(a)?.[$('x')]?.[$('y')][$('z')]);
`````

## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { z: 10 };
const tmpObjLitVal /*:object*/ = { y: tmpObjLitVal$1 };
const a /*:object*/ = { x: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(a);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$1) {
    $(undefined);
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`y`);
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject[tmpChainRootComputed$1];
    const tmpChainRootComputed$3 /*:unknown*/ = $(`z`);
    const tmpChainElementObject$3 /*:unknown*/ = tmpChainElementObject$1[tmpChainRootComputed$3];
    $(tmpChainElementObject$3);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = { z: 10 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
const tmpChainElementCall = $({ x: tmpObjLitVal });
if (tmpChainElementCall == null) {
  $(undefined);
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (tmpChainElementObject == null) {
    $(undefined);
  } else {
    const tmpChainRootComputed$1 = $(`y`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    const tmpChainRootComputed$3 = $(`z`);
    $(tmpChainElementObject$1[tmpChainRootComputed$3]);
  }
}
`````

## Pre Normal


`````js filename=intro
let a = { x: { y: { z: 10 } } };
$($(a)?.[$(`x`)]?.[$(`y`)][$(`z`)]);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { z: 10 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
let a = { x: tmpObjLitVal };
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(a);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed$1 = $(`y`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    const tmpChainRootComputed$3 = $(`z`);
    const tmpChainElementObject$3 = tmpChainElementObject$1[tmpChainRootComputed$3];
    tmpCalleeParam = tmpChainElementObject$3;
    $(tmpChainElementObject$3);
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
const a = { z: 10 };
const b = { y: a };
const c = { x: b };
const d = $( c );
const e = d == null;
if (e) {
  $( undefined );
}
else {
  const f = $( "x" );
  const g = d[ f ];
  const h = g == null;
  if (h) {
    $( undefined );
  }
  else {
    const i = $( "y" );
    const j = g[ i ];
    const k = $( "z" );
    const l = j[ k ];
    $( l );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '{"y":"{\\"z\\":\\"10\\"}"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 'z'
 - 5: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
