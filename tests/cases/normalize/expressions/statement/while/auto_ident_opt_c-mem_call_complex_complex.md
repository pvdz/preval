# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Statement > While > Auto ident opt c-mem call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ($(b)?.[$("$")]?.($(1))) $(100);
$(a);
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
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed = $(`\$`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 = tmpChainElementObject != null;
    if (tmpIfTest$3) {
      const tmpCallCallee = $dotCall;
      const tmpCalleeParam = tmpChainElementObject;
      const tmpCalleeParam$1 = tmpChainElementCall;
      const tmpCalleeParam$3 = $(1);
      const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
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

## Output


`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
let $tmpLoopUnrollCheck = true;
const tmpChainElementCall = $(b);
const tmpIfTest$1 = tmpChainElementCall == null;
if (tmpIfTest$1) {
  $(100);
} else {
  const tmpChainRootComputed = $(`\$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$3 = tmpChainElementObject == null;
  if (tmpIfTest$3) {
    $(100);
  } else {
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$3);
    if (tmpChainElementCall$1) {
      $(100);
    } else {
      $tmpLoopUnrollCheck = false;
    }
  }
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpChainElementCall$2 = $(b);
    const tmpIfTest$2 = tmpChainElementCall$2 == null;
    if (tmpIfTest$2) {
      $(100);
    } else {
      const tmpChainRootComputed$1 = $(`\$`);
      const tmpChainElementObject$1 = tmpChainElementCall$2[tmpChainRootComputed$1];
      const tmpIfTest$4 = tmpChainElementObject$1 == null;
      if (tmpIfTest$4) {
        $(100);
      } else {
        const tmpCalleeParam$1 = $(1);
        const tmpChainElementCall$4 = $dotCall(tmpChainElementObject$1, tmpChainElementCall$2, tmpCalleeParam$1);
        if (tmpChainElementCall$4) {
          $(100);
        } else {
          break;
        }
      }
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
  b: 1000,
};
let c = true;
const d = $( a );
const e = d == null;
if (e) {
  $( 100 );
}
else {
  const f = $( "$" );
  const g = d[ f ];
  const h = g == null;
  if (h) {
    $( 100 );
  }
  else {
    const i = $( 1 );
    const j = $dotCall( g, d, i );
    if (j) {
      $( 100 );
    }
    else {
      c = false;
    }
  }
}
if (c) {
  while ($LOOP_UNROLL_10) {
    const k = $( a );
    const l = k == null;
    if (l) {
      $( 100 );
    }
    else {
      const m = $( "$" );
      const n = k[ m ];
      const o = n == null;
      if (o) {
        $( 100 );
      }
      else {
        const p = $( 1 );
        const q = $dotCall( n, k, p );
        if (q) {
          $( 100 );
        }
        else {
          break;
        }
      }
    }
  }
}
$( b );
`````

## Globals

None

## Result

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

Final output calls: Same
