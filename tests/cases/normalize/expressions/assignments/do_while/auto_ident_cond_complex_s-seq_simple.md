# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident cond complex s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(1) ? (40, 50, 60) : $($(100))));
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
    tmpDoWhileFlag = a = $(1) ? (40, 50, 60) : $($(100));
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
const tmpIfTest = $(1);
let tmpSSA_a = 60;
if (tmpIfTest) {
} else {
  const tmpCalleeParam = $(100);
  tmpNestedComplexRhs = $(tmpCalleeParam);
  tmpSSA_a = tmpNestedComplexRhs;
}
let tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
  $(100);
  let tmpNestedComplexRhs$1 = 60;
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$1 = $(100);
    tmpNestedComplexRhs$1 = $(tmpCalleeParam$1);
  }
  tmpSSA_a = tmpNestedComplexRhs$1;
  tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      let tmpNestedComplexRhs$2 = 60;
      const tmpIfTest$2 = $(1);
      if (tmpIfTest$2) {
      } else {
        const tmpCalleeParam$2 = $(100);
        tmpNestedComplexRhs$2 = $(tmpCalleeParam$2);
      }
      tmpSSA_a = tmpNestedComplexRhs$2;
      tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs$2;
    } else {
      break;
    }
  }
} else {
}
$(tmpSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
let a = 60;
const b = $( 1 );
let c = 60;
if (b) {

}
else {
  const d = $( 100 );
  a = $( d );
  c = a;
}
let e = a;
if (a) {
  $( 100 );
  let f = 60;
  const g = $( 1 );
  if (g) {

  }
  else {
    const h = $( 100 );
    f = $( h );
  }
  c = f;
  e = f;
  while ($LOOP_UNROLL_9) {
    if (e) {
      $( 100 );
      let i = 60;
      const j = $( 1 );
      if (j) {

      }
      else {
        const k = $( 100 );
        i = $( k );
      }
      c = i;
      e = i;
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
