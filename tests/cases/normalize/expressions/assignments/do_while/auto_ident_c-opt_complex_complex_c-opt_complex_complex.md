# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(b)?.[$("x")]?.[$("y")]));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
$(100);
const tmpObjLitVal /*:object*/ = { y: 1 };
const b /*:object*/ = { x: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$3) {
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`y`);
    a = tmpChainElementObject[tmpChainRootComputed$1];
  }
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpChainElementCall$1 /*:unknown*/ = $(b);
    const tmpIfTest$2 /*:boolean*/ = tmpChainElementCall$1 == null;
    if (tmpIfTest$2) {
    } else {
      const tmpChainRootComputed$2 /*:unknown*/ = $(`x`);
      const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementCall$1[tmpChainRootComputed$2];
      const tmpIfTest$4 /*:boolean*/ = tmpChainElementObject$1 == null;
      if (tmpIfTest$4) {
      } else {
        const tmpChainRootComputed$4 /*:unknown*/ = $(`y`);
        a = tmpChainElementObject$1[tmpChainRootComputed$4];
      }
    }
    if (a) {
    } else {
      break;
    }
  }
  $(a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
$(100);
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
if (a) {
  while (true) {
    $(100);
    const tmpChainElementCall$1 = $(b);
    if (!(tmpChainElementCall$1 == null)) {
      const tmpChainRootComputed$2 = $(`x`);
      const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$2];
      if (!(tmpChainElementObject$1 == null)) {
        const tmpChainRootComputed$4 = $(`y`);
        a = tmpChainElementObject$1[tmpChainRootComputed$4];
      }
    }
    if (!a) {
      break;
    }
  }
  $(a);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
$( 100 );
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
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const j = $( c );
    const k = j == null;
    if (k) {

    }
    else {
      const l = $( "x" );
      const m = j[ l ];
      const n = m == null;
      if (n) {

      }
      else {
        const o = $( "y" );
        a = m[ o ];
      }
    }
    if (a) {

    }
    else {
      break;
    }
  }
  $( a );
}
else {
  $( a );
}
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { x: '{"y":"1"}' }
 - 3: 'x'
 - 4: 'y'
 - 5: 100
 - 6: { x: '{"y":"1"}' }
 - 7: 'x'
 - 8: 'y'
 - 9: 100
 - 10: { x: '{"y":"1"}' }
 - 11: 'x'
 - 12: 'y'
 - 13: 100
 - 14: { x: '{"y":"1"}' }
 - 15: 'x'
 - 16: 'y'
 - 17: 100
 - 18: { x: '{"y":"1"}' }
 - 19: 'x'
 - 20: 'y'
 - 21: 100
 - 22: { x: '{"y":"1"}' }
 - 23: 'x'
 - 24: 'y'
 - 25: 100
 - 26: { x: '{"y":"1"}' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
