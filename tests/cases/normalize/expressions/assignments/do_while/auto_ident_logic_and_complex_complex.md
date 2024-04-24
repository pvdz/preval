# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(1)) && $($(2))));
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
    tmpDoWhileFlag = a = $($(1)) && $($(2));
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
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(2);
      tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
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
let tmpNestedComplexRhs = $(tmpCalleeParam);
let tmpSSA_a = undefined;
if (tmpNestedComplexRhs) {
  const tmpCalleeParam$1 = $(2);
  tmpNestedComplexRhs = $(tmpCalleeParam$1);
  tmpSSA_a = tmpNestedComplexRhs;
} else {
  tmpSSA_a = tmpNestedComplexRhs;
}
let tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
  $(100);
  const tmpCalleeParam$2 = $(1);
  let tmpNestedComplexRhs$1 = $(tmpCalleeParam$2);
  if (tmpNestedComplexRhs$1) {
    const tmpCalleeParam$4 = $(2);
    tmpNestedComplexRhs$1 = $(tmpCalleeParam$4);
  } else {
  }
  tmpSSA_a = tmpNestedComplexRhs$1;
  tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      const tmpCalleeParam$3 = $(1);
      let tmpNestedComplexRhs$2 = $(tmpCalleeParam$3);
      if (tmpNestedComplexRhs$2) {
        const tmpCalleeParam$5 = $(2);
        tmpNestedComplexRhs$2 = $(tmpCalleeParam$5);
      } else {
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
const a = $( 1 );
let b = $( a );
let c = undefined;
if (b) {
  const d = $( 2 );
  b = $( d );
  c = b;
}
else {
  c = b;
}
let e = b;
if (b) {
  $( 100 );
  const f = $( 1 );
  let g = $( f );
  if (g) {
    const h = $( 2 );
    g = $( h );
  }
  c = g;
  e = g;
  while ($LOOP_UNROLL_9) {
    if (e) {
      $( 100 );
      const i = $( 1 );
      let j = $( i );
      if (j) {
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
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 2
 - 6: 100
 - 7: 1
 - 8: 1
 - 9: 2
 - 10: 2
 - 11: 100
 - 12: 1
 - 13: 1
 - 14: 2
 - 15: 2
 - 16: 100
 - 17: 1
 - 18: 1
 - 19: 2
 - 20: 2
 - 21: 100
 - 22: 1
 - 23: 1
 - 24: 2
 - 25: 2
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
