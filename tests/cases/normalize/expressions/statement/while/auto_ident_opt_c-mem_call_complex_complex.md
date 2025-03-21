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
let tmpIfTest /*:unknown*/ = undefined;
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
    const tmpCalleeParam$3 /*:unknown*/ = $(1);
    const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam$3);
    tmpIfTest = tmpChainElementCall$1;
  }
}
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    let tmpIfTest$2 /*:unknown*/ = undefined;
    const tmpChainElementCall$2 /*:unknown*/ = $(b);
    const tmpIfTest$4 /*:boolean*/ = tmpChainElementCall$2 == null;
    if (tmpIfTest$4) {
    } else {
      const tmpChainRootComputed$1 /*:unknown*/ = $(`\$`);
      const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementCall$2[tmpChainRootComputed$1];
      const tmpIfTest$6 /*:boolean*/ = tmpChainElementObject$1 == null;
      if (tmpIfTest$6) {
      } else {
        const tmpCalleeParam$1 /*:unknown*/ = $(1);
        const tmpChainElementCall$4 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementCall$2, undefined, tmpCalleeParam$1);
        tmpIfTest$2 = tmpChainElementCall$4;
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
    const tmpChainElementCall$2 = $(b);
    if (!(tmpChainElementCall$2 == null)) {
      const tmpChainRootComputed$1 = $(`\$`);
      const tmpChainElementObject$1 = tmpChainElementCall$2[tmpChainRootComputed$1];
      if (!(tmpChainElementObject$1 == null)) {
        tmpIfTest$2 = $dotCall(tmpChainElementObject$1, tmpChainElementCall$2, undefined, $(1));
      }
    }
    if (!tmpIfTest$2) {
      break;
    }
  }
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while ($(b)?.[$(`\$`)]?.($(1))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = $(b);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed = $(`\$`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 = tmpChainElementObject != null;
    if (tmpIfTest$3) {
      const tmpCalleeParam = tmpChainElementObject;
      const tmpCalleeParam$1 = tmpChainElementCall;
      const tmpCalleeParam$3 = $(1);
      const tmpChainElementCall$1 = $dotCall(tmpCalleeParam, tmpCalleeParam$1, undefined, tmpCalleeParam$3);
      tmpIfTest = tmpChainElementCall$1;
    } else {
    }
  } else {
  }
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
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
    const i = $dotCall( f, c, undefined, h );
    a = i;
  }
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    let j = undefined;
    const k = $( b );
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
        const q = $dotCall( n, k, undefined, p );
        j = q;
      }
    }
    if (j) {

    }
    else {
      break;
    }
  }
}
const r = {
  a: 999,
  b: 1000,
};
$( r );
`````

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

Todos triggered:
- objects in isFree check
- Support referencing this builtin in isFree: $
