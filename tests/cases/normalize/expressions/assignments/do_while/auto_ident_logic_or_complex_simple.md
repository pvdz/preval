# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(0)) || 2));
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
    tmpDoWhileFlag = a = $($(0)) || 2;
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
    const tmpCallCallee = $;
    const tmpCalleeParam = $(0);
    let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
    if (tmpNestedComplexRhs) {
    } else {
      tmpNestedComplexRhs = 2;
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
const tmpCalleeParam = $(0);
const tmpNestedComplexRhs = $(tmpCalleeParam);
let tmpClusterSSA_a = 2;
let tmpClusterSSA_tmpDoWhileFlag = true;
let $tmpLoopUnrollCheck = false;
if (tmpNestedComplexRhs) {
  tmpClusterSSA_a = tmpNestedComplexRhs;
  tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
  $tmpLoopUnrollCheck = tmpNestedComplexRhs;
} else {
  $tmpLoopUnrollCheck = tmpClusterSSA_tmpDoWhileFlag;
}
if (tmpClusterSSA_tmpDoWhileFlag) {
  $(100);
  const tmpCalleeParam$1 = $(0);
  let tmpNestedComplexRhs$1 = $(tmpCalleeParam$1);
  if (tmpNestedComplexRhs$1) {
  } else {
    tmpNestedComplexRhs$1 = 2;
  }
  tmpClusterSSA_a = tmpNestedComplexRhs$1;
  tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs$1;
} else {
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag) {
      $(100);
      const tmpCalleeParam$2 = $(0);
      let tmpNestedComplexRhs$2 = $(tmpCalleeParam$2);
      if (tmpNestedComplexRhs$2) {
      } else {
        tmpNestedComplexRhs$2 = 2;
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
const a = $( 0 );
const b = $( a );
let c = 2;
let d = true;
let e = false;
if (b) {
  c = b;
  d = b;
  e = b;
}
else {
  e = d;
}
if (d) {
  $( 100 );
  const f = $( 0 );
  let g = $( f );
  if (g) {

  }
  else {
    g = 2;
  }
  c = g;
  d = g;
}
if (e) {
  while ($LOOP_UNROLL_9) {
    if (d) {
      $( 100 );
      const h = $( 0 );
      let i = $( h );
      if (i) {

      }
      else {
        i = 2;
      }
      c = i;
      d = i;
    }
    else {
      break;
    }
  }
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 0
 - 4: 100
 - 5: 0
 - 6: 0
 - 7: 100
 - 8: 0
 - 9: 0
 - 10: 100
 - 11: 0
 - 12: 0
 - 13: 100
 - 14: 0
 - 15: 0
 - 16: 100
 - 17: 0
 - 18: 0
 - 19: 100
 - 20: 0
 - 21: 0
 - 22: 100
 - 23: 0
 - 24: 0
 - 25: 100
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
