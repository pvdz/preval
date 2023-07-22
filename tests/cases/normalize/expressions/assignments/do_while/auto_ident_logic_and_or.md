# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = ($($(1)) && $($(1))) || $($(2))));
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
    tmpDoWhileFlag = a = ($($(1)) && $($(1))) || $($(2));
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
      const tmpCalleeParam$1 = $(1);
      tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
    } else {
    }
    if (tmpNestedComplexRhs) {
    } else {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$3);
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
if (tmpNestedComplexRhs) {
  const tmpCalleeParam$1 = $(1);
  tmpNestedComplexRhs = $(tmpCalleeParam$1);
} else {
}
let tmpClusterSSA_a = undefined;
if (tmpNestedComplexRhs) {
  tmpClusterSSA_a = tmpNestedComplexRhs;
} else {
  const tmpCalleeParam$3 = $(2);
  tmpNestedComplexRhs = $(tmpCalleeParam$3);
  tmpClusterSSA_a = tmpNestedComplexRhs;
}
let tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
let $tmpLoopUnrollCheck = true;
if (tmpClusterSSA_tmpDoWhileFlag) {
  $(100);
  const tmpCalleeParam$2 = $(1);
  let tmpNestedComplexRhs$1 = $(tmpCalleeParam$2);
  if (tmpNestedComplexRhs$1) {
    const tmpCalleeParam$4 = $(1);
    tmpNestedComplexRhs$1 = $(tmpCalleeParam$4);
  } else {
  }
  if (tmpNestedComplexRhs$1) {
  } else {
    const tmpCalleeParam$6 = $(2);
    tmpNestedComplexRhs$1 = $(tmpCalleeParam$6);
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
      const tmpCalleeParam$5 = $(1);
      let tmpNestedComplexRhs$2 = $(tmpCalleeParam$5);
      if (tmpNestedComplexRhs$2) {
        const tmpCalleeParam$7 = $(1);
        tmpNestedComplexRhs$2 = $(tmpCalleeParam$7);
      } else {
      }
      if (tmpNestedComplexRhs$2) {
      } else {
        const tmpCalleeParam$9 = $(2);
        tmpNestedComplexRhs$2 = $(tmpCalleeParam$9);
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
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
let d = undefined;
if (b) {
  d = b;
}
else {
  const e = $( 2 );
  b = $( e );
  d = b;
}
let f = b;
let g = true;
if (f) {
  $( 100 );
  const h = $( 1 );
  let i = $( h );
  if (i) {
    const j = $( 1 );
    i = $( j );
  }
  if (i) {

  }
  else {
    const k = $( 2 );
    i = $( k );
  }
  d = i;
  f = i;
}
else {
  g = false;
}
if (g) {
  while ($LOOP_UNROLL_9) {
    if (f) {
      $( 100 );
      const l = $( 1 );
      let m = $( l );
      if (m) {
        const n = $( 1 );
        m = $( n );
      }
      if (m) {

      }
      else {
        const o = $( 2 );
        m = $( o );
      }
      d = m;
      f = m;
    }
    else {
      break;
    }
  }
}
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 100
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
