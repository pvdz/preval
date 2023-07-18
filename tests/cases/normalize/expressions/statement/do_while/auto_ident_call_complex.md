# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident call complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($)(1));
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
    tmpDoWhileFlag = $($)(1);
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
    const tmpCallComplexCallee = $($);
    tmpDoWhileFlag = tmpCallComplexCallee(1);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
$(100);
const tmpCallComplexCallee = $($);
const tmpDoWhileFlag = tmpCallComplexCallee(1);
if (tmpDoWhileFlag) {
  $(100);
  const tmpCallComplexCallee$1 = $($);
  let tmpClusterSSA_tmpDoWhileFlag = tmpCallComplexCallee$1(1);
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag) {
      $(100);
      const tmpCallComplexCallee$2 = $($);
      tmpClusterSSA_tmpDoWhileFlag = tmpCallComplexCallee$2(1);
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = $( $ );
const b = a( 1 );
if (b) {
  $( 100 );
  const c = $( $ );
  let d = c( 1 );
  while ($LOOP_UNROLL_9) {
    if (d) {
      $( 100 );
      const e = $( $ );
      d = e( 1 );
    }
    else {
      break;
    }
  }
}
const f = {
a: 999,
b: 1000
;
$( f );
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
