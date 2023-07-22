# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Assignments > Do while > Auto ident call complex complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($)($(1), $(2))));
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
    tmpDoWhileFlag = a = $($)($(1), $(2));
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
    const tmpCallCallee = $($);
    const tmpCalleeParam = $(1);
    const tmpCalleeParam$1 = $(2);
    const tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
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
const tmpCallCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
let tmpClusterSSA_a = tmpNestedComplexRhs;
let tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
let $tmpLoopUnrollCheck = true;
if (tmpNestedComplexRhs) {
  $(100);
  const tmpCallCallee$1 = $($);
  const tmpCalleeParam$2 = $(1);
  const tmpCalleeParam$4 = $(2);
  const tmpNestedComplexRhs$1 = tmpCallCallee$1(tmpCalleeParam$2, tmpCalleeParam$4);
  tmpClusterSSA_a = tmpNestedComplexRhs$1;
  tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs$1;
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag) {
      $(100);
      const tmpCallCallee$2 = $($);
      const tmpCalleeParam$3 = $(1);
      const tmpCalleeParam$5 = $(2);
      const tmpNestedComplexRhs$2 = tmpCallCallee$2(tmpCalleeParam$3, tmpCalleeParam$5);
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
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
const d = a( b, c );
let e = d;
let f = d;
let g = true;
if (d) {
  $( 100 );
  const h = $( $ );
  const i = $( 1 );
  const j = $( 2 );
  const k = h( i, j );
  e = k;
  f = k;
}
else {
  g = false;
}
if (g) {
  while ($LOOP_UNROLL_9) {
    if (f) {
      $( 100 );
      const l = $( $ );
      const m = $( 1 );
      const n = $( 2 );
      const o = l( m, n );
      e = o;
      f = o;
    }
    else {
      break;
    }
  }
}
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - 6: 100
 - 7: '<$>'
 - 8: 1
 - 9: 2
 - 10: 1, 2
 - 11: 100
 - 12: '<$>'
 - 13: 1
 - 14: 2
 - 15: 1, 2
 - 16: 100
 - 17: '<$>'
 - 18: 1
 - 19: 2
 - 20: 1, 2
 - 21: 100
 - 22: '<$>'
 - 23: 1
 - 24: 2
 - 25: 1, 2
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
