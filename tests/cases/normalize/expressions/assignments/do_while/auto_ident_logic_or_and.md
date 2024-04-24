# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(0)) || ($($(1)) && $($(2)))));
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
    tmpDoWhileFlag = a = $($(0)) || ($($(1)) && $($(2)));
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
      const tmpCalleeParam$1 = $(1);
      tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
      if (tmpNestedComplexRhs) {
        const tmpCallCallee$3 = $;
        const tmpCalleeParam$3 = $(2);
        tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$3);
      } else {
      }
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
if (tmpNestedComplexRhs) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpNestedComplexRhs = $(tmpCalleeParam$1);
  if (tmpNestedComplexRhs) {
    const tmpCalleeParam$3 = $(2);
    tmpNestedComplexRhs = $(tmpCalleeParam$3);
  } else {
  }
}
let tmpSSA_a = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
  $(100);
  const tmpCalleeParam$2 = $(0);
  let tmpNestedComplexRhs$1 = $(tmpCalleeParam$2);
  if (tmpNestedComplexRhs$1) {
  } else {
    const tmpCalleeParam$4 = $(1);
    tmpNestedComplexRhs$1 = $(tmpCalleeParam$4);
    if (tmpNestedComplexRhs$1) {
      const tmpCalleeParam$6 = $(2);
      tmpNestedComplexRhs$1 = $(tmpCalleeParam$6);
    } else {
    }
  }
  tmpSSA_a = tmpNestedComplexRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_a) {
      $(100);
      const tmpCalleeParam$5 = $(0);
      let tmpNestedComplexRhs$2 = $(tmpCalleeParam$5);
      if (tmpNestedComplexRhs$2) {
      } else {
        const tmpCalleeParam$7 = $(1);
        tmpNestedComplexRhs$2 = $(tmpCalleeParam$7);
        if (tmpNestedComplexRhs$2) {
          const tmpCalleeParam$9 = $(2);
          tmpNestedComplexRhs$2 = $(tmpCalleeParam$9);
        } else {
        }
      }
      tmpSSA_a = tmpNestedComplexRhs$2;
      tmpSSA_a = tmpNestedComplexRhs$2;
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
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
let e = b;
if (b) {
  $( 100 );
  const f = $( 0 );
  let g = $( f );
  if (g) {

  }
  else {
    const h = $( 1 );
    g = $( h );
    if (g) {
      const i = $( 2 );
      g = $( i );
    }
  }
  e = g;
  while ($LOOP_UNROLL_9) {
    if (e) {
      $( 100 );
      const j = $( 0 );
      let k = $( j );
      if (k) {

      }
      else {
        const l = $( 1 );
        k = $( l );
        if (k) {
          const m = $( 2 );
          k = $( m );
        }
      }
      e = k;
      e = k;
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
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - 8: 100
 - 9: 0
 - 10: 0
 - 11: 1
 - 12: 1
 - 13: 2
 - 14: 2
 - 15: 100
 - 16: 0
 - 17: 0
 - 18: 1
 - 19: 1
 - 20: 2
 - 21: 2
 - 22: 100
 - 23: 0
 - 24: 0
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
