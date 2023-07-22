# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic and complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(1)) && 2));
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
    tmpDoWhileFlag = a = $($(1)) && 2;
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
    const tmpCalleeParam = $(1);
    let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
    if (tmpNestedComplexRhs) {
      tmpNestedComplexRhs = 2;
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
const tmpCalleeParam = $(1);
const tmpNestedComplexRhs = $(tmpCalleeParam);
let tmpClusterSSA_a = 2;
let tmpClusterSSA_tmpDoWhileFlag = true;
if (tmpNestedComplexRhs) {
} else {
  tmpClusterSSA_a = tmpNestedComplexRhs;
  tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
}
let $tmpLoopUnrollCheck = true;
if (tmpClusterSSA_tmpDoWhileFlag) {
  $(100);
  const tmpCalleeParam$1 = $(1);
  let tmpNestedComplexRhs$1 = $(tmpCalleeParam$1);
  if (tmpNestedComplexRhs$1) {
    tmpNestedComplexRhs$1 = 2;
  } else {
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
      const tmpCalleeParam$2 = $(1);
      let tmpNestedComplexRhs$2 = $(tmpCalleeParam$2);
      if (tmpNestedComplexRhs$2) {
        tmpNestedComplexRhs$2 = 2;
      } else {
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
const a = $( 1 );
const b = $( a );
let c = 2;
let d = true;
if (b) {

}
else {
  c = b;
  d = b;
}
let e = true;
if (d) {
  $( 100 );
  const f = $( 1 );
  let g = $( f );
  if (g) {
    g = 2;
  }
  c = g;
  d = g;
}
else {
  e = false;
}
if (e) {
  while ($LOOP_UNROLL_9) {
    if (d) {
      $( 100 );
      const h = $( 1 );
      let i = $( h );
      if (i) {
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
 - 2: 1
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 1
 - 7: 100
 - 8: 1
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 1
 - 19: 100
 - 20: 1
 - 21: 1
 - 22: 100
 - 23: 1
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
