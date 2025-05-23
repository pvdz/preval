# Preval test case

# double_coputed_call.md

> Normalize > Optional > Double coputed call
>
> Order of complex expressions in double optional computed property

## Input

`````js filename=intro
let a = {x: {y: {z: $}}};
$($(a)?.[$('x')]?.[$('y')][$('z')])?.(100);
`````


## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpObjLitVal$1 /*:object*/ = { z: $ };
const tmpObjLitVal /*:object*/ = { y: tmpObjLitVal$1 };
const a /*:object*/ = { x: tmpObjLitVal };
const tmpChainElementCall$3 /*:unknown*/ = $(a);
const tmpIfTest /*:boolean*/ = tmpChainElementCall$3 == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall$3[tmpChainRootComputed];
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`y`);
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject[tmpChainRootComputed$1];
    const tmpChainRootComputed$3 /*:unknown*/ = $(`z`);
    tmpCalleeParam = tmpChainElementObject$1[tmpChainRootComputed$3];
  }
}
const tmpChainElementCall /*:unknown*/ = $(tmpCalleeParam);
const tmpIfTest$3 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$3) {
} else {
  $dotCall(tmpChainElementCall, $, undefined, 100);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpObjLitVal$1 = { z: $ };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
const tmpChainElementCall$3 = $({ x: tmpObjLitVal });
if (!(tmpChainElementCall$3 == null)) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall$3[tmpChainRootComputed];
  if (!(tmpChainElementObject == null)) {
    const tmpChainRootComputed$1 = $(`y`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    const tmpChainRootComputed$3 = $(`z`);
    tmpCalleeParam = tmpChainElementObject$1[tmpChainRootComputed$3];
  }
}
const tmpChainElementCall = $(tmpCalleeParam);
if (!(tmpChainElementCall == null)) {
  $dotCall(tmpChainElementCall, $, undefined, 100);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { z: $ };
const c = { y: b };
const d = { x: c };
const e = $( d );
const f = e == null;
if (f) {

}
else {
  const g = $( "x" );
  const h = e[ g ];
  const i = h == null;
  if (i) {

  }
  else {
    const j = $( "y" );
    const k = h[ j ];
    const l = $( "z" );
    a = k[ l ];
  }
}
const m = $( a );
const n = m == null;
if (n) {

}
else {
  $dotCall( m, $, undefined, 100 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal$1 = { z: $ };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
let a = { x: tmpObjLitVal };
const tmpChainRootCall = $;
const tmpCallCallee = tmpChainRootCall;
let tmpCalleeParam = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$3 = $(a);
const tmpIfTest = tmpChainElementCall$3 != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall$3[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed$1 = $(`y`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    const tmpChainRootComputed$3 = $(`z`);
    const tmpChainElementObject$3 = tmpChainElementObject$1[tmpChainRootComputed$3];
    tmpCalleeParam = tmpChainElementObject$3;
  } else {
  }
} else {
}
const tmpChainElementCall = tmpChainRootCall(tmpCalleeParam);
const tmpIfTest$3 = tmpChainElementCall != null;
if (tmpIfTest$3) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, undefined, 100);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '{"y":"{\\"z\\":\\"\\\\\\"<$>\\\\\\"\\"}"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 'z'
 - 5: '<$>'
 - 6: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
