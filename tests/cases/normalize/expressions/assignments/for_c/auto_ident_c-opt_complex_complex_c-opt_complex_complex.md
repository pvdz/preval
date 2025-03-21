# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
for (; $(1); a = $(b)?.[$("x")]?.[$("y")]);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
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
      tmpChainElementObject[tmpChainRootComputed$1];
    }
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(1);
    if (tmpIfTest$2) {
      const tmpChainElementCall$1 /*:unknown*/ = $(b);
      const tmpIfTest$4 /*:boolean*/ = tmpChainElementCall$1 == null;
      if (tmpIfTest$4) {
      } else {
        const tmpChainRootComputed$2 /*:unknown*/ = $(`x`);
        const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementCall$1[tmpChainRootComputed$2];
        const tmpIfTest$6 /*:boolean*/ = tmpChainElementObject$1 == null;
        if (tmpIfTest$6) {
        } else {
          const tmpChainRootComputed$4 /*:unknown*/ = $(`y`);
          tmpChainElementObject$1[tmpChainRootComputed$4];
        }
      }
    } else {
      break;
    }
  }
  $(undefined);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpObjLitVal = { y: 1 };
  const b = { x: tmpObjLitVal };
  const tmpChainElementCall = $(b);
  if (!(tmpChainElementCall == null)) {
    const tmpChainRootComputed = $(`x`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    if (!(tmpChainElementObject == null)) {
      const tmpChainRootComputed$1 = $(`y`);
      tmpChainElementObject[tmpChainRootComputed$1];
    }
  }
  while (true) {
    if ($(1)) {
      const tmpChainElementCall$1 = $(b);
      if (!(tmpChainElementCall$1 == null)) {
        const tmpChainRootComputed$2 = $(`x`);
        const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$2];
        if (!(tmpChainElementObject$1 == null)) {
          const tmpChainRootComputed$4 = $(`y`);
          tmpChainElementObject$1[tmpChainRootComputed$4];
        }
      }
    } else {
      break;
    }
  }
  $(undefined);
} else {
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
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
      g[ i ];
    }
  }
  while ($LOOP_UNROLL_10) {
    const j = $( 1 );
    if (j) {
      const k = $( c );
      const l = k == null;
      if (l) {

      }
      else {
        const m = $( "x" );
        const n = k[ m ];
        const o = n == null;
        if (o) {

        }
        else {
          const p = $( "y" );
          n[ p ];
        }
      }
    }
    else {
      break;
    }
  }
  $( undefined );
}
else {
  const q = {
    a: 999,
    b: 1000,
  };
  $( q );
}
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { x: '{"y":"1"}' }
 - 3: 'x'
 - 4: 'y'
 - 5: 1
 - 6: { x: '{"y":"1"}' }
 - 7: 'x'
 - 8: 'y'
 - 9: 1
 - 10: { x: '{"y":"1"}' }
 - 11: 'x'
 - 12: 'y'
 - 13: 1
 - 14: { x: '{"y":"1"}' }
 - 15: 'x'
 - 16: 'y'
 - 17: 1
 - 18: { x: '{"y":"1"}' }
 - 19: 'x'
 - 20: 'y'
 - 21: 1
 - 22: { x: '{"y":"1"}' }
 - 23: 'x'
 - 24: 'y'
 - 25: 1
 - 26: { x: '{"y":"1"}' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
