# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(1)) && $($(2)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ($($(1)) && $($(2))) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let tmpIfTest = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(2);
    tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest) {
    } else {
      break;
    }
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
$(100);
const tmpCalleeParam = $(1);
const tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCalleeParam$1 = $(2);
  const tmpClusterSSA_tmpIfTest = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpIfTest) {
  } else {
    $tmpLoopUnrollCheck = false;
  }
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$2 = $(1);
    const tmpIfTest$1 = $(tmpCalleeParam$2);
    if (tmpIfTest$1) {
      const tmpCalleeParam$4 = $(2);
      const tmpClusterSSA_tmpIfTest$1 = $(tmpCalleeParam$4);
      if (tmpClusterSSA_tmpIfTest$1) {
      } else {
        break;
      }
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
let a = true;
$( 100 );
const b = $( 1 );
const c = $( b );
if (c) {
  const d = $( 2 );
  const e = $( d );
  if (e) {

  }
  else {
    a = false;
  }
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const f = $( 1 );
    const g = $( f );
    if (g) {
      const h = $( 2 );
      const i = $( h );
      if (i) {

      }
      else {
        break;
      }
    }
    else {
      break;
    }
  }
}
const j = {
a: 999,
b: 1000
;
$( j );
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
