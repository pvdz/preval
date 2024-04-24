# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(0)) || $($(2))));
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
    tmpDoWhileFlag = a = $($(0)) || $($(2));
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
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(2);
      tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
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
let tmpNestedComplexRhs = $(tmpCalleeParam);
let tmpSSA_a = undefined;
if (tmpNestedComplexRhs) {
  tmpSSA_a = tmpNestedComplexRhs;
} else {
  const tmpCalleeParam$1 = $(2);
  tmpNestedComplexRhs = $(tmpCalleeParam$1);
  tmpSSA_a = tmpNestedComplexRhs;
}
let tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
  $(100);
  const tmpCalleeParam$2 = $(0);
  let tmpNestedComplexRhs$1 = $(tmpCalleeParam$2);
  if (tmpNestedComplexRhs$1) {
  } else {
    const tmpCalleeParam$4 = $(2);
    tmpNestedComplexRhs$1 = $(tmpCalleeParam$4);
  }
  tmpSSA_a = tmpNestedComplexRhs$1;
  tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      const tmpCalleeParam$3 = $(0);
      let tmpNestedComplexRhs$2 = $(tmpCalleeParam$3);
      if (tmpNestedComplexRhs$2) {
      } else {
        const tmpCalleeParam$5 = $(2);
        tmpNestedComplexRhs$2 = $(tmpCalleeParam$5);
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
const a = $( 0 );
let b = $( a );
let c = undefined;
if (b) {
  c = b;
}
else {
  const d = $( 2 );
  b = $( d );
  c = b;
}
let e = b;
if (b) {
  $( 100 );
  const f = $( 0 );
  let g = $( f );
  if (g) {

  }
  else {
    const h = $( 2 );
    g = $( h );
  }
  c = g;
  e = g;
  while ($LOOP_UNROLL_9) {
    if (e) {
      $( 100 );
      const i = $( 0 );
      let j = $( i );
      if (j) {

      }
      else {
        const k = $( 2 );
        j = $( k );
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
 - 2: 0
 - 3: 0
 - 4: 2
 - 5: 2
 - 6: 100
 - 7: 0
 - 8: 0
 - 9: 2
 - 10: 2
 - 11: 100
 - 12: 0
 - 13: 0
 - 14: 2
 - 15: 2
 - 16: 100
 - 17: 0
 - 18: 0
 - 19: 2
 - 20: 2
 - 21: 100
 - 22: 0
 - 23: 0
 - 24: 2
 - 25: 2
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
