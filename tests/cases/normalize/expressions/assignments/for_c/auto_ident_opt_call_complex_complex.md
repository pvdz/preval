# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); a = $($)?.($(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  let tmpClusterSSA_a /*:unknown*/ = undefined;
  const tmpChainElementCall /*:unknown*/ = $($);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam /*:unknown*/ = $(1);
    tmpClusterSSA_a = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam);
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(1);
    if (tmpIfTest$2) {
      tmpClusterSSA_a = undefined;
      const tmpChainElementCall$1 /*:unknown*/ = $($);
      const tmpIfTest$4 /*:boolean*/ = tmpChainElementCall$1 == null;
      if (tmpIfTest$4) {
      } else {
        const tmpCalleeParam$1 /*:unknown*/ = $(1);
        tmpClusterSSA_a = $dotCall(tmpChainElementCall$1, $, undefined, tmpCalleeParam$1);
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
  const tmpChainElementCall = $($);
  if (!(tmpChainElementCall == null)) {
    tmpClusterSSA_a = $dotCall(tmpChainElementCall, $, undefined, $(1));
  }
  while (true) {
    if ($(1)) {
      tmpClusterSSA_a = undefined;
      const tmpChainElementCall$1 = $($);
      if (!(tmpChainElementCall$1 == null)) {
        tmpClusterSSA_a = $dotCall(tmpChainElementCall$1, $, undefined, $(1));
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
  const c = $( $ );
  const d = c == null;
  if (d) {

  }
  else {
    const e = $( 1 );
    b = $dotCall( c, $, undefined, e );
  }
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      b = undefined;
      const g = $( $ );
      const h = g == null;
      if (h) {

      }
      else {
        const i = $( 1 );
        b = $dotCall( g, $, undefined, i );
      }
    }
    else {
      break;
    }
  }
  $( b );
}
else {
  const j = {
    a: 999,
    b: 1000,
  };
  $( j );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    a = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = $($);
    const tmpIfTest$1 = tmpChainElementCall != null;
    if (tmpIfTest$1) {
      let tmpCalleeParam = $(1);
      const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, undefined, tmpCalleeParam);
      a = tmpChainElementCall$1;
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
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: '<$>'
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: '<$>'
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: '<$>'
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: '<$>'
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: '<$>'
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
