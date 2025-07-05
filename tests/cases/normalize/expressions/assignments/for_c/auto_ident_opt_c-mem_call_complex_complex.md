# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); a = $(b)?.[$("$")]?.($(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  let tmpClusterSSA_a /*:unknown*/ = undefined;
  const b /*:object*/ /*truthy*/ = { $: $ };
  const tmpChainElementCall /*:unknown*/ = $(b);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed /*:unknown*/ = $(`\$`);
    const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject == null;
    if (tmpIfTest$3) {
    } else {
      const tmpCalleeParam /*:unknown*/ = $(1);
      tmpClusterSSA_a = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam);
    }
  }
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpIfTest$2 /*:unknown*/ = $(1);
    if (tmpIfTest$2) {
      tmpClusterSSA_a = undefined;
      const tmpChainElementCall$1 /*:unknown*/ = $(b);
      const tmpIfTest$4 /*:boolean*/ = tmpChainElementCall$1 == null;
      if (tmpIfTest$4) {
      } else {
        const tmpChainRootComputed$1 /*:unknown*/ = $(`\$`);
        const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementCall$1[tmpChainRootComputed$1];
        const tmpIfTest$6 /*:boolean*/ = tmpChainElementObject$1 == null;
        if (tmpIfTest$6) {
        } else {
          const tmpCalleeParam$1 /*:unknown*/ = $(1);
          tmpClusterSSA_a = $dotCall(tmpChainElementObject$1, tmpChainElementCall$1, undefined, tmpCalleeParam$1);
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
  const b = { $: $ };
  const tmpChainElementCall = $(b);
  if (!(tmpChainElementCall == null)) {
    const tmpChainRootComputed = $(`\$`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    if (!(tmpChainElementObject == null)) {
      tmpClusterSSA_a = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, $(1));
    }
  }
  while (true) {
    if ($(1)) {
      tmpClusterSSA_a = undefined;
      const tmpChainElementCall$1 = $(b);
      if (!(tmpChainElementCall$1 == null)) {
        const tmpChainRootComputed$1 = $(`\$`);
        const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$1];
        if (!(tmpChainElementObject$1 == null)) {
          tmpClusterSSA_a = $dotCall(tmpChainElementObject$1, tmpChainElementCall$1, undefined, $(1));
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
  const c = { $: $ };
  const d = $( c );
  const e = d == null;
  if (e) {

  }
  else {
    const f = $( "$" );
    const g = d[ f ];
    const h = g == null;
    if (h) {

    }
    else {
      const i = $( 1 );
      b = $dotCall( g, d, undefined, i );
    }
  }
  while ($LOOP_UNROLLS_LEFT_10) {
    const j = $( 1 );
    if (j) {
      b = undefined;
      const k = $( c );
      const l = k == null;
      if (l) {

      }
      else {
        const m = $( "$" );
        const n = k[ m ];
        const o = n == null;
        if (o) {

        }
        else {
          const p = $( 1 );
          b = $dotCall( n, k, undefined, p );
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
  const q = {
    a: 999,
    b: 1000,
  };
  $( q );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    a = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = $(b);
    const tmpIfTest$1 = tmpChainElementCall != null;
    if (tmpIfTest$1) {
      const tmpChainRootComputed = $(`\$`);
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
      const tmpIfTest$3 = tmpChainElementObject != null;
      if (tmpIfTest$3) {
        let tmpCalleeParam = $(1);
        const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam);
        a = tmpChainElementCall$1;
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
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: { $: '"<$>"' }
 - 8: '$'
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: { $: '"<$>"' }
 - 13: '$'
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: { $: '"<$>"' }
 - 18: '$'
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: { $: '"<$>"' }
 - 23: '$'
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
