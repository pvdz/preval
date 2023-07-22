# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Statement > For c > Auto ident opt c-mem call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); $(b)?.[$("$")]?.($(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    $(b)?.[$(`\$`)]?.($(1));
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
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
      } else {
      }
    } else {
    }
    tmpIfTest = $(1);
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
let tmpIfTest = $(1);
let $tmpLoopUnrollCheck = true;
if (tmpIfTest) {
  const tmpChainElementCall = $(b);
  const tmpIfTest$1 = tmpChainElementCall == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed = $(`\$`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 = tmpChainElementObject == null;
    if (tmpIfTest$3) {
    } else {
      const tmpCalleeParam$3 = $(1);
      $dotCall(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$3);
    }
  }
  tmpIfTest = $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpChainElementCall$1 = $(b);
      const tmpIfTest$2 = tmpChainElementCall$1 == null;
      if (tmpIfTest$2) {
      } else {
        const tmpChainRootComputed$1 = $(`\$`);
        const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$1];
        const tmpIfTest$4 = tmpChainElementObject$1 == null;
        if (tmpIfTest$4) {
        } else {
          const tmpCalleeParam$1 = $(1);
          $dotCall(tmpChainElementObject$1, tmpChainElementCall$1, tmpCalleeParam$1);
        }
      }
      tmpIfTest = $(1);
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
let c = $( 1 );
let d = true;
if (c) {
  const e = $( a );
  const f = e == null;
  if (f) {

  }
  else {
    const g = $( "$" );
    const h = e[ g ];
    const i = h == null;
    if (i) {

    }
    else {
      const j = $( 1 );
      $dotCall( h, e, j );
    }
  }
  c = $( 1 );
}
else {
  d = false;
}
if (d) {
  while ($LOOP_UNROLL_10) {
    if (c) {
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
          $dotCall( n, k, p );
        }
      }
      c = $( 1 );
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
