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
  let tmpClusterSSA_a /*:unknown*/ = undefined;
  const tmpObjLitVal /*:object*/ /*truthy*/ = { y: 1 };
  const b /*:object*/ /*truthy*/ = { x: tmpObjLitVal };
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
      tmpClusterSSA_a = tmpChainElementObject[tmpChainRootComputed$1];
    }
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(1);
    if (tmpIfTest$2) {
      tmpClusterSSA_a = undefined;
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
          tmpClusterSSA_a = tmpChainElementObject$1[tmpChainRootComputed$4];
        }
      }
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  let tmpClusterSSA_a = undefined;
  const tmpObjLitVal = { y: 1 };
  const b = { x: tmpObjLitVal };
  const tmpChainElementCall = $(b);
  if (!(tmpChainElementCall == null)) {
    const tmpChainRootComputed = $(`x`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    if (!(tmpChainElementObject == null)) {
      const tmpChainRootComputed$1 = $(`y`);
      tmpClusterSSA_a = tmpChainElementObject[tmpChainRootComputed$1];
    }
  }
  while (true) {
    if ($(1)) {
      tmpClusterSSA_a = undefined;
      const tmpChainElementCall$1 = $(b);
      if (!(tmpChainElementCall$1 == null)) {
        const tmpChainRootComputed$2 = $(`x`);
        const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$2];
        if (!(tmpChainElementObject$1 == null)) {
          const tmpChainRootComputed$4 = $(`y`);
          tmpClusterSSA_a = tmpChainElementObject$1[tmpChainRootComputed$4];
        }
      }
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  let b = undefined;
  const c = { y: 1 };
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
      b = h[ j ];
    }
  }
  while ($LOOP_UNROLL_10) {
    const k = $( 1 );
    if (k) {
      b = undefined;
      const l = $( d );
      const m = l == null;
      if (m) {

      }
      else {
        const n = $( "x" );
        const o = l[ n ];
        const p = o == null;
        if (p) {

        }
        else {
          const q = $( "y" );
          b = o[ q ];
        }
      }
    }
    else {
      break;
    }
  }
  $( b );
}
else {
  const r = {
    a: 999,
    b: 1000,
  };
  $( r );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    a = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = $(b);
    const tmpIfTest$1 = tmpChainElementCall != null;
    if (tmpIfTest$1) {
      const tmpChainRootComputed = $(`x`);
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
      const tmpIfTest$3 = tmpChainElementObject != null;
      if (tmpIfTest$3) {
        const tmpChainRootComputed$1 = $(`y`);
        const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
        a = tmpChainElementObject$1;
      } else {
      }
    } else {
    }
  } else {
    break;
  }
}
$(a);
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
