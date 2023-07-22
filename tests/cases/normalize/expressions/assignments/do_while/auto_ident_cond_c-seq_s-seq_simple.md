# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident cond c-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))));
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
    tmpDoWhileFlag = a = (10, 20, $(30)) ? (40, 50, 60) : $($(100));
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
    const tmpIfTest = $(30);
    if (tmpIfTest) {
      tmpNestedComplexRhs = 60;
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
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
let tmpNestedComplexRhs = 60;
const tmpIfTest = $(30);
let tmpClusterSSA_a = 60;
if (tmpIfTest) {
} else {
  const tmpCalleeParam = $(100);
  tmpNestedComplexRhs = $(tmpCalleeParam);
  tmpClusterSSA_a = tmpNestedComplexRhs;
}
let tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
let $tmpLoopUnrollCheck = true;
if (tmpClusterSSA_tmpDoWhileFlag) {
  $(100);
  let tmpNestedComplexRhs$1 = 60;
  const tmpIfTest$1 = $(30);
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$1 = $(100);
    tmpNestedComplexRhs$1 = $(tmpCalleeParam$1);
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
      let tmpNestedComplexRhs$2 = 60;
      const tmpIfTest$2 = $(30);
      if (tmpIfTest$2) {
      } else {
        const tmpCalleeParam$2 = $(100);
        tmpNestedComplexRhs$2 = $(tmpCalleeParam$2);
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
let a = 60;
const b = $( 30 );
let c = 60;
if (b) {

}
else {
  const d = $( 100 );
  a = $( d );
  c = a;
}
let e = a;
let f = true;
if (e) {
  $( 100 );
  let g = 60;
  const h = $( 30 );
  if (h) {

  }
  else {
    const i = $( 100 );
    g = $( i );
  }
  c = g;
  e = g;
}
else {
  f = false;
}
if (f) {
  while ($LOOP_UNROLL_9) {
    if (e) {
      $( 100 );
      let j = 60;
      const k = $( 30 );
      if (k) {

      }
      else {
        const l = $( 100 );
        j = $( l );
      }
      c = j;
      e = j;
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
 - 2: 30
 - 3: 100
 - 4: 30
 - 5: 100
 - 6: 30
 - 7: 100
 - 8: 30
 - 9: 100
 - 10: 30
 - 11: 100
 - 12: 30
 - 13: 100
 - 14: 30
 - 15: 100
 - 16: 30
 - 17: 100
 - 18: 30
 - 19: 100
 - 20: 30
 - 21: 100
 - 22: 30
 - 23: 100
 - 24: 30
 - 25: 100
 - 26: 30
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
