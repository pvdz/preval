# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Statement > For c > Auto ident opt c-mem call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); $(b)?.[$("$")]?.($(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
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
      $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam);
    }
  }
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpIfTest$2 /*:unknown*/ = $(1);
    if (tmpIfTest$2) {
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
          $dotCall(tmpChainElementObject$1, tmpChainElementCall$1, undefined, tmpCalleeParam$1);
        }
      }
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const b = { $: $ };
  const tmpChainElementCall = $(b);
  if (!(tmpChainElementCall == null)) {
    const tmpChainRootComputed = $(`\$`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    if (!(tmpChainElementObject == null)) {
      $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, $(1));
    }
  }
  while (true) {
    if ($(1)) {
      const tmpChainElementCall$1 = $(b);
      if (!(tmpChainElementCall$1 == null)) {
        const tmpChainRootComputed$1 = $(`\$`);
        const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$1];
        if (!(tmpChainElementObject$1 == null)) {
          $dotCall(tmpChainElementObject$1, tmpChainElementCall$1, undefined, $(1));
        }
      }
    } else {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = { $: $ };
  const c = $( b );
  const d = c == null;
  if (d) {

  }
  else {
    const e = $( "$" );
    const f = c[ e ];
    const g = f == null;
    if (g) {

    }
    else {
      const h = $( 1 );
      $dotCall( f, c, undefined, h );
    }
  }
  while ($LOOP_UNROLLS_LEFT_10) {
    const i = $( 1 );
    if (i) {
      const j = $( b );
      const k = j == null;
      if (k) {

      }
      else {
        const l = $( "$" );
        const m = j[ l ];
        const n = m == null;
        if (n) {

        }
        else {
          const o = $( 1 );
          $dotCall( m, j, undefined, o );
        }
      }
    }
    else {
      break;
    }
  }
}
const p = {
  a: 999,
  b: 1000,
};
$( p );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
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
