# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$((a = $(b)?.[$("x")]?.[$("y")]) + (a = $(b)?.[$("x")]?.[$("y")]));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpObjLitVal /*:object*/ = { y: 1 };
const b /*:object*/ = { x: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`y`);
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject[tmpChainRootComputed$1];
    a = tmpChainElementObject$1;
  }
}
const tmpBinBothLhs /*:unknown*/ = a;
let tmpClusterSSA_a /*:unknown*/ = undefined;
const tmpChainElementCall$1 /*:unknown*/ = $(b);
const tmpIfTest$3 /*:boolean*/ = tmpChainElementCall$1 == null;
if (tmpIfTest$3) {
} else {
  const tmpChainRootComputed$3 /*:unknown*/ = $(`x`);
  const tmpChainElementObject$3 /*:unknown*/ = tmpChainElementCall$1[tmpChainRootComputed$3];
  const tmpIfTest$5 /*:boolean*/ = tmpChainElementObject$3 == null;
  if (tmpIfTest$5) {
  } else {
    const tmpChainRootComputed$5 /*:unknown*/ = $(`y`);
    const tmpChainElementObject$5 /*:unknown*/ = tmpChainElementObject$3[tmpChainRootComputed$5];
    tmpClusterSSA_a = tmpChainElementObject$5;
  }
}
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
const tmpChainElementCall = $(b);
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (!(tmpChainElementObject == null)) {
    const tmpChainRootComputed$1 = $(`y`);
    a = tmpChainElementObject[tmpChainRootComputed$1];
  }
}
const tmpBinBothLhs = a;
let tmpClusterSSA_a = undefined;
const tmpChainElementCall$1 = $(b);
if (!(tmpChainElementCall$1 == null)) {
  const tmpChainRootComputed$3 = $(`x`);
  const tmpChainElementObject$3 = tmpChainElementCall$1[tmpChainRootComputed$3];
  if (!(tmpChainElementObject$3 == null)) {
    const tmpChainRootComputed$5 = $(`y`);
    tmpClusterSSA_a = tmpChainElementObject$3[tmpChainRootComputed$5];
  }
}
$(tmpBinBothLhs + tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { y: 1 };
const c = { x: b };
const d = $( c );
const e = d == null;
if (e) {

}
else {
  const f = $( "x" );
  const g = d[ f ];
  const h = g == null;
  if (h) {

  }
  else {
    const i = $( "y" );
    const j = g[ i ];
    a = j;
  }
}
const k = a;
let l = undefined;
const m = $( c );
const n = m == null;
if (n) {

}
else {
  const o = $( "x" );
  const p = m[ o ];
  const q = p == null;
  if (q) {

  }
  else {
    const r = $( "y" );
    const s = p[ r ];
    l = s;
  }
}
const t = k + l;
$( t );
$( l );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: { x: '{"y":"1"}' }
 - 5: 'x'
 - 6: 'y'
 - 7: 2
 - 8: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
