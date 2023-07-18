# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident cond complex simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(1) ? 2 : $($(100))));
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
    tmpDoWhileFlag = a = $(1) ? 2 : $($(100));
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
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      tmpNestedComplexRhs = 2;
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
let tmpNestedComplexRhs = 2;
const tmpIfTest = $(1);
let tmpClusterSSA_a = 2;
if (tmpIfTest) {
} else {
  const tmpCalleeParam = $(100);
  tmpNestedComplexRhs = $(tmpCalleeParam);
  tmpClusterSSA_a = tmpNestedComplexRhs;
}
if (tmpNestedComplexRhs) {
  $(100);
  let tmpNestedComplexRhs$1 = 2;
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$1 = $(100);
    tmpNestedComplexRhs$1 = $(tmpCalleeParam$1);
  }
  tmpClusterSSA_a = tmpNestedComplexRhs$1;
  let tmpClusterSSA_tmpDoWhileFlag$1 = tmpNestedComplexRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag$1) {
      $(100);
      let tmpNestedComplexRhs$2 = 2;
      const tmpIfTest$2 = $(1);
      if (tmpIfTest$2) {
      } else {
        const tmpCalleeParam$2 = $(100);
        tmpNestedComplexRhs$2 = $(tmpCalleeParam$2);
      }
      tmpClusterSSA_a = tmpNestedComplexRhs$2;
      tmpClusterSSA_tmpDoWhileFlag$1 = tmpNestedComplexRhs$2;
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
let a = 2;
const b = $( 1 );
let c = 2;
if (b) {

}
else {
  const d = $( 100 );
  a = $( d );
  c = a;
}
if (a) {
  $( 100 );
  let e = 2;
  const f = $( 1 );
  if (f) {

  }
  else {
    const g = $( 100 );
    e = $( g );
  }
  c = e;
  let h = e;
  while ($LOOP_UNROLL_9) {
    if (h) {
      $( 100 );
      let i = 2;
      const j = $( 1 );
      if (j) {

      }
      else {
        const k = $( 100 );
        i = $( k );
      }
      c = i;
      h = i;
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
 - 3: 100
 - 4: 1
 - 5: 100
 - 6: 1
 - 7: 100
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 100
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 100
 - 16: 1
 - 17: 100
 - 18: 1
 - 19: 100
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 100
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
