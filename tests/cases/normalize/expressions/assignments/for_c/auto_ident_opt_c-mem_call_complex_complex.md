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

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = $(b)?.[$(`\$`)]?.($(1));
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    a = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall(b);
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

## Output


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  a = undefined;
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
      $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam$3);
    }
  }
  while ($LOOP_UNROLL_10) {
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
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
if (b) {
  a = undefined;
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
      $dotCall( g, d, undefined, i );
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
        const m = $( "$" );
        const n = k[ m ];
        const o = n == null;
        if (o) {

        }
        else {
          const p = $( 1 );
          $dotCall( n, k, undefined, p );
        }
      }
    }
    else {
      break;
    }
  }
}
$( a );
`````

## Globals

None

## Result

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

Final output calls: Same

Todos triggered:
- objects in isFree check