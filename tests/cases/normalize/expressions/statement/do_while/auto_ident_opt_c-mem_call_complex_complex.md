# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident opt c-mem call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($(b)?.[$("$")]?.($(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = $(b)?.[$(`\$`)]?.($(1));
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    tmpDoWhileFlag = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall(b);
    const tmpIfTest = tmpChainElementCall != null;
    if (tmpIfTest) {
      const tmpChainRootComputed = $(`\$`);
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
      const tmpIfTest$1 = tmpChainElementObject != null;
      if (tmpIfTest$1) {
        const tmpCallCallee = $dotCall;
        const tmpCalleeParam = tmpChainElementObject;
        const tmpCalleeParam$1 = tmpChainElementCall;
        const tmpCalleeParam$3 = $(1);
        const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
        tmpDoWhileFlag = tmpChainElementCall$1;
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
const b = { $: $ };
const a = { a: 999, b: 1000 };
$(100);
let tmpDoWhileFlag = false;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed = $(`\$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject == null;
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$3);
    tmpDoWhileFlag = tmpChainElementCall$1;
  }
}
if (tmpDoWhileFlag) {
  $(100);
  tmpDoWhileFlag = false;
  const tmpChainElementCall$2 = $(b);
  const tmpIfTest$2 = tmpChainElementCall$2 == null;
  if (tmpIfTest$2) {
  } else {
    const tmpChainRootComputed$1 = $(`\$`);
    const tmpChainElementObject$1 = tmpChainElementCall$2[tmpChainRootComputed$1];
    const tmpIfTest$4 = tmpChainElementObject$1 == null;
    if (tmpIfTest$4) {
    } else {
      const tmpCalleeParam$1 = $(1);
      const tmpChainElementCall$4 = $dotCall(tmpChainElementObject$1, tmpChainElementCall$2, tmpCalleeParam$1);
      tmpDoWhileFlag = tmpChainElementCall$4;
    }
  }
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      tmpDoWhileFlag = false;
      const tmpChainElementCall$3 = $(b);
      const tmpIfTest$3 = tmpChainElementCall$3 == null;
      if (tmpIfTest$3) {
      } else {
        const tmpChainRootComputed$2 = $(`\$`);
        const tmpChainElementObject$2 = tmpChainElementCall$3[tmpChainRootComputed$2];
        const tmpIfTest$5 = tmpChainElementObject$2 == null;
        if (tmpIfTest$5) {
        } else {
          const tmpCalleeParam$2 = $(1);
          const tmpChainElementCall$5 = $dotCall(tmpChainElementObject$2, tmpChainElementCall$3, tmpCalleeParam$2);
          tmpDoWhileFlag = tmpChainElementCall$5;
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
const a = { $: $ };
const b = {
a: 999,
b: 1000
;
$( 100 );
let c = false;
const d = $( a );
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
    const j = $dotCall( g, d, i );
    c = j;
  }
}
if (c) {
  $( 100 );
  c = false;
  const k = $( a );
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
      const q = $dotCall( n, k, p );
      c = q;
    }
  }
  while ($LOOP_UNROLL_9) {
    if (c) {
      $( 100 );
      c = false;
      const r = $( a );
      const s = r == null;
      if (s) {

      }
      else {
        const t = $( "$" );
        const u = r[ t ];
        const v = u == null;
        if (v) {

        }
        else {
          const w = $( 1 );
          const x = $dotCall( u, r, w );
          c = x;
        }
      }
    }
    else {
      break;
    }
  }
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 1
 - 6: 100
 - 7: { $: '"<$>"' }
 - 8: '$'
 - 9: 1
 - 10: 1
 - 11: 100
 - 12: { $: '"<$>"' }
 - 13: '$'
 - 14: 1
 - 15: 1
 - 16: 100
 - 17: { $: '"<$>"' }
 - 18: '$'
 - 19: 1
 - 20: 1
 - 21: 100
 - 22: { $: '"<$>"' }
 - 23: '$'
 - 24: 1
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
