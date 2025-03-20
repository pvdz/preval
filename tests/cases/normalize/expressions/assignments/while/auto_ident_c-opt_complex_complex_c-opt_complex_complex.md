# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > While > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
while ((a = $(b)?.[$("x")]?.[$("y")])) $(100);
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
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
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject[tmpChainRootComputed$1];
    a = tmpChainElementObject$1;
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
      const tmpChainElementObject$2 /*:unknown*/ = tmpChainElementCall$1[tmpChainRootComputed$2];
      const tmpIfTest$4 /*:boolean*/ = tmpChainElementObject$2 == null;
      if (tmpIfTest$4) {
      } else {
        const tmpChainRootComputed$4 /*:unknown*/ = $(`y`);
        const tmpChainElementObject$4 /*:unknown*/ = tmpChainElementObject$2[tmpChainRootComputed$4];
        a = tmpChainElementObject$4;
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
      const tmpChainElementObject$2 = tmpChainElementCall$1[tmpChainRootComputed$2];
      if (!(tmpChainElementObject$2 == null)) {
        const tmpChainRootComputed$4 = $(`y`);
        a = tmpChainElementObject$2[tmpChainRootComputed$4];
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
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
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
        const q = n[ p ];
        a = q;
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


- objects in isFree check
- Support referencing this builtin in isFree: $


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 100
 - 5: { x: '{"y":"1"}' }
 - 6: 'x'
 - 7: 'y'
 - 8: 100
 - 9: { x: '{"y":"1"}' }
 - 10: 'x'
 - 11: 'y'
 - 12: 100
 - 13: { x: '{"y":"1"}' }
 - 14: 'x'
 - 15: 'y'
 - 16: 100
 - 17: { x: '{"y":"1"}' }
 - 18: 'x'
 - 19: 'y'
 - 20: 100
 - 21: { x: '{"y":"1"}' }
 - 22: 'x'
 - 23: 'y'
 - 24: 100
 - 25: { x: '{"y":"1"}' }
 - 26: 'x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
