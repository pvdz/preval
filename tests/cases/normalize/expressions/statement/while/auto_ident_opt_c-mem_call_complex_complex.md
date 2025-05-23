# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Statement > While > Auto ident opt c-mem call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ($(b)?.[$("$")]?.($(1))) $(100);
$(a);
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ /*ternaryConst*/ = undefined;
const b /*:object*/ = { $: $ };
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
    tmpIfTest = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam);
  }
}
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    let tmpIfTest$2 /*:unknown*/ /*ternaryConst*/ = undefined;
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
        tmpIfTest$2 = $dotCall(tmpChainElementObject$1, tmpChainElementCall$1, undefined, tmpCalleeParam$1);
      }
    }
    if (tmpIfTest$2) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = undefined;
const b = { $: $ };
const tmpChainElementCall = $(b);
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`\$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (!(tmpChainElementObject == null)) {
    tmpIfTest = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, $(1));
  }
}
if (tmpIfTest) {
  while (true) {
    $(100);
    let tmpIfTest$2 = undefined;
    const tmpChainElementCall$1 = $(b);
    if (!(tmpChainElementCall$1 == null)) {
      const tmpChainRootComputed$1 = $(`\$`);
      const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$1];
      if (!(tmpChainElementObject$1 == null)) {
        tmpIfTest$2 = $dotCall(tmpChainElementObject$1, tmpChainElementCall$1, undefined, $(1));
      }
    }
    if (!tmpIfTest$2) {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
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
    a = $dotCall( f, c, undefined, h );
  }
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    let i = undefined;
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
        i = $dotCall( m, j, undefined, o );
      }
    }
    if (i) {

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


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: 100
 - 6: { $: '"<$>"' }
 - 7: '$'
 - 8: 1
 - 9: 1
 - 10: 100
 - 11: { $: '"<$>"' }
 - 12: '$'
 - 13: 1
 - 14: 1
 - 15: 100
 - 16: { $: '"<$>"' }
 - 17: '$'
 - 18: 1
 - 19: 1
 - 20: 100
 - 21: { $: '"<$>"' }
 - 22: '$'
 - 23: 1
 - 24: 1
 - 25: 100
 - 26: { $: '"<$>"' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
