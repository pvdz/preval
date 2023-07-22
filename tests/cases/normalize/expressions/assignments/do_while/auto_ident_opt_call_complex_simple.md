# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident opt call complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($)?.(1)));
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
    tmpDoWhileFlag = a = $($)?.(1);
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
      const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, 1);
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
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, 1);
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
    const tmpChainElementCall$4 = $dotCall(tmpChainElementCall$2, $, 1);
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
        const tmpChainElementCall$5 = $dotCall(tmpChainElementCall$3, $, 1);
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
  const e = $dotCall( b, $, 1 );
  a = e;
  d = e;
}
let f = a;
let g = true;
if (f) {
  $( 100 );
  let h = undefined;
  const i = $( $ );
  const j = i == null;
  if (j) {

  }
  else {
    const k = $dotCall( i, $, 1 );
    h = k;
  }
  d = h;
  f = h;
}
else {
  g = false;
}
if (g) {
  while ($LOOP_UNROLL_9) {
    if (f) {
      $( 100 );
      let l = undefined;
      const m = $( $ );
      const n = m == null;
      if (n) {

      }
      else {
        const o = $dotCall( m, $, 1 );
        l = o;
      }
      d = l;
      f = l;
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
 - 4: 100
 - 5: '<$>'
 - 6: 1
 - 7: 100
 - 8: '<$>'
 - 9: 1
 - 10: 100
 - 11: '<$>'
 - 12: 1
 - 13: 100
 - 14: '<$>'
 - 15: 1
 - 16: 100
 - 17: '<$>'
 - 18: 1
 - 19: 100
 - 20: '<$>'
 - 21: 1
 - 22: 100
 - 23: '<$>'
 - 24: 1
 - 25: 100
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
