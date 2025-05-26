# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident opt complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = $(b)?.x);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  let tmpClusterSSA_a /*:unknown*/ = undefined;
  const b /*:object*/ = { x: 1 };
  const tmpChainElementCall /*:unknown*/ = $(b);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
  if (tmpIfTest$1) {
  } else {
    tmpClusterSSA_a = tmpChainElementCall.x;
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(1);
    if (tmpIfTest$2) {
      tmpClusterSSA_a = undefined;
      const tmpChainElementCall$1 /*:unknown*/ = $(b);
      const tmpIfTest$4 /*:boolean*/ = tmpChainElementCall$1 == null;
      if (tmpIfTest$4) {
      } else {
        tmpClusterSSA_a = tmpChainElementCall$1.x;
      }
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  let tmpClusterSSA_a = undefined;
  const b = { x: 1 };
  const tmpChainElementCall = $(b);
  if (!(tmpChainElementCall == null)) {
    tmpClusterSSA_a = tmpChainElementCall.x;
  }
  while (true) {
    if ($(1)) {
      tmpClusterSSA_a = undefined;
      const tmpChainElementCall$1 = $(b);
      if (!(tmpChainElementCall$1 == null)) {
        tmpClusterSSA_a = tmpChainElementCall$1.x;
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
  const c = { x: 1 };
  const d = $( c );
  const e = d == null;
  if (e) {

  }
  else {
    b = d.x;
  }
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      b = undefined;
      const g = $( c );
      const h = g == null;
      if (h) {

      }
      else {
        b = g.x;
      }
    }
    else {
      break;
    }
  }
  $( b );
}
else {
  const i = {
    a: 999,
    b: 1000,
  };
  $( i );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    a = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = $(b);
    const tmpIfTest$1 = tmpChainElementCall != null;
    if (tmpIfTest$1) {
      const tmpChainElementObject = tmpChainElementCall.x;
      a = tmpChainElementObject;
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
 - 2: { x: '1' }
 - 3: 1
 - 4: { x: '1' }
 - 5: 1
 - 6: { x: '1' }
 - 7: 1
 - 8: { x: '1' }
 - 9: 1
 - 10: { x: '1' }
 - 11: 1
 - 12: { x: '1' }
 - 13: 1
 - 14: { x: '1' }
 - 15: 1
 - 16: { x: '1' }
 - 17: 1
 - 18: { x: '1' }
 - 19: 1
 - 20: { x: '1' }
 - 21: 1
 - 22: { x: '1' }
 - 23: 1
 - 24: { x: '1' }
 - 25: 1
 - 26: { x: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
