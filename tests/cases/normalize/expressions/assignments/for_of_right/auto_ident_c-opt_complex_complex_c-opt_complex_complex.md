# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > For of right > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
for (let x of (a = $(b)?.[$("x")]?.[$("y")]));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpObjLitVal /*:object*/ /*truthy*/ = { y: 1 };
const b /*:object*/ /*truthy*/ = { x: tmpObjLitVal };
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
    a = tmpChainElementObject[tmpChainRootComputed$1];
  }
}
const tmpForOfGenNext /*:unknown*/ = $forOf(a);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
  const tmpIfTest$3 /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest$3) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpObjLitVal = { y: 1 };
const tmpChainElementCall = $({ x: tmpObjLitVal });
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (!(tmpChainElementObject == null)) {
    const tmpChainRootComputed$1 = $(`y`);
    a = tmpChainElementObject[tmpChainRootComputed$1];
  }
}
const tmpForOfGenNext = $forOf(a);
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(a);
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
    a = g[ i ];
  }
}
const j = $forOf( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const k = j();
  const l = k.done;
  if (l) {
    break;
  }
  else {
    k.value;
  }
}
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed$1 = $(`y`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    a = tmpChainElementObject$1;
  } else {
  }
} else {
}
let tmpCalleeParam = a;
const tmpForOfGenNext = $forOf(a);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext = tmpForOfGenNext();
  const tmpIfTest$3 = tmpForOfNext.done;
  if (tmpIfTest$3) {
    break;
  } else {
    let x = tmpForOfNext.value;
  }
}
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
