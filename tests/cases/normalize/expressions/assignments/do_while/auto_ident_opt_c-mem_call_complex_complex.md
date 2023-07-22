# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(b)?.[$("$")]?.($(1))));
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
    tmpDoWhileFlag = a = $(b)?.[$(`\$`)]?.($(1));
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
    let tmpNestedComplexRhs = undefined;
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
        tmpNestedComplexRhs = tmpChainElementCall$1;
      } else {
      }
    } else {
    }
    a = tmpNestedComplexRhs;
    tmpDoWhileFlag = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
$(100);
let tmpNestedComplexRhs = undefined;
const b = { $: $ };
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
    tmpNestedComplexRhs = tmpChainElementCall$1;
  }
}
let tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
let $tmpLoopUnrollCheck = true;
if (tmpClusterSSA_tmpDoWhileFlag) {
  $(100);
  let tmpNestedComplexRhs$1 = undefined;
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
      tmpNestedComplexRhs$1 = tmpChainElementCall$4;
    }
  }
  tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs$1;
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag) {
      $(100);
      let tmpNestedComplexRhs$2 = undefined;
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
          tmpNestedComplexRhs$2 = tmpChainElementCall$5;
        }
      }
      tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs$2;
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_tmpDoWhileFlag);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
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
    const i = $dotCall( f, c, h );
    a = i;
  }
}
let j = a;
let k = true;
if (j) {
  $( 100 );
  let l = undefined;
  const m = $( b );
  const n = m == null;
  if (n) {

  }
  else {
    const o = $( "$" );
    const p = m[ o ];
    const q = p == null;
    if (q) {

    }
    else {
      const r = $( 1 );
      const s = $dotCall( p, m, r );
      l = s;
    }
  }
  j = l;
}
else {
  k = false;
}
if (k) {
  while ($LOOP_UNROLL_9) {
    if (j) {
      $( 100 );
      let t = undefined;
      const u = $( b );
      const v = u == null;
      if (v) {

      }
      else {
        const w = $( "$" );
        const x = u[ w ];
        const y = x == null;
        if (y) {

        }
        else {
          const z = $( 1 );
          const 01 = $dotCall( x, u, z );
          t = 01;
        }
      }
      j = t;
    }
    else {
      break;
    }
  }
}
$( j );
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
