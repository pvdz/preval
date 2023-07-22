# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($)?.($(1))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = $($)?.($(1));
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    let tmpNestedComplexRhs = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall($);
    const tmpIfTest = tmpChainElementCall != null;
    if (tmpIfTest) {
      const tmpCallCallee = $dotCall;
      const tmpCalleeParam = tmpChainElementCall;
      const tmpCalleeParam$1 = tmpChainRootCall;
      const tmpCalleeParam$3 = $(1);
      const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
      tmpNestedComplexRhs = tmpChainElementCall$1;
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
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
let tmpClusterSSA_a = undefined;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, tmpCalleeParam$3);
  tmpNestedComplexRhs = tmpChainElementCall$1;
  tmpClusterSSA_a = tmpChainElementCall$1;
}
let tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
let $tmpLoopUnrollCheck = true;
if (tmpClusterSSA_tmpDoWhileFlag) {
  $(100);
  let tmpNestedComplexRhs$1 = undefined;
  const tmpChainElementCall$2 = $($);
  const tmpIfTest$1 = tmpChainElementCall$2 == null;
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$1 = $(1);
    const tmpChainElementCall$4 = $dotCall(tmpChainElementCall$2, $, tmpCalleeParam$1);
    tmpNestedComplexRhs$1 = tmpChainElementCall$4;
  }
  tmpClusterSSA_a = tmpNestedComplexRhs$1;
  tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs$1;
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag) {
      $(100);
      let tmpNestedComplexRhs$2 = undefined;
      const tmpChainElementCall$3 = $($);
      const tmpIfTest$2 = tmpChainElementCall$3 == null;
      if (tmpIfTest$2) {
      } else {
        const tmpCalleeParam$2 = $(1);
        const tmpChainElementCall$5 = $dotCall(tmpChainElementCall$3, $, tmpCalleeParam$2);
        tmpNestedComplexRhs$2 = tmpChainElementCall$5;
      }
      tmpClusterSSA_a = tmpNestedComplexRhs$2;
      tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs$2;
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
let a = undefined;
const b = $( $ );
const c = b == null;
let d = undefined;
if (c) {

}
else {
  const e = $( 1 );
  const f = $dotCall( b, $, e );
  a = f;
  d = f;
}
let g = a;
let h = true;
if (g) {
  $( 100 );
  let i = undefined;
  const j = $( $ );
  const k = j == null;
  if (k) {

  }
  else {
    const l = $( 1 );
    const m = $dotCall( j, $, l );
    i = m;
  }
  d = i;
  g = i;
}
else {
  h = false;
}
if (h) {
  while ($LOOP_UNROLL_9) {
    if (g) {
      $( 100 );
      let n = undefined;
      const o = $( $ );
      const p = o == null;
      if (p) {

      }
      else {
        const q = $( 1 );
        const r = $dotCall( o, $, q );
        n = r;
      }
      d = n;
      g = n;
    }
    else {
      break;
    }
  }
}
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - 5: 100
 - 6: '<$>'
 - 7: 1
 - 8: 1
 - 9: 100
 - 10: '<$>'
 - 11: 1
 - 12: 1
 - 13: 100
 - 14: '<$>'
 - 15: 1
 - 16: 1
 - 17: 100
 - 18: '<$>'
 - 19: 1
 - 20: 1
 - 21: 100
 - 22: '<$>'
 - 23: 1
 - 24: 1
 - 25: 100
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
