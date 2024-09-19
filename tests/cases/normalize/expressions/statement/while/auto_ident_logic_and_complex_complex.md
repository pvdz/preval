# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > While > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($(1)) && $($(2))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($(1)) && $($(2))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let tmpIfTest = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(2);
    tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest) {
      $(100);
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
const tmpCalleeParam = $(1);
const tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCalleeParam$1 = $(2);
  const tmpClusterSSA_tmpIfTest = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpIfTest) {
    $(100);
    while ($LOOP_UNROLL_10) {
      const tmpCalleeParam$2 = $(1);
      const tmpIfTest$1 = $(tmpCalleeParam$2);
      if (tmpIfTest$1) {
        const tmpCalleeParam$4 = $(2);
        const tmpClusterSSA_tmpIfTest$1 = $(tmpCalleeParam$4);
        if (tmpClusterSSA_tmpIfTest$1) {
          $(100);
        } else {
          break;
        }
      } else {
        break;
      }
    }
  } else {
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 2 );
  const d = $( c );
  if (d) {
    $( 100 );
    while ($LOOP_UNROLL_10) {
      const e = $( 1 );
      const f = $( e );
      if (f) {
        const g = $( 2 );
        const h = $( g );
        if (h) {
          $( 100 );
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
}
const i = {
  a: 999,
  b: 1000,
};
$( i );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 100
 - 6: 1
 - 7: 1
 - 8: 2
 - 9: 2
 - 10: 100
 - 11: 1
 - 12: 1
 - 13: 2
 - 14: 2
 - 15: 100
 - 16: 1
 - 17: 1
 - 18: 2
 - 19: 2
 - 20: 100
 - 21: 1
 - 22: 1
 - 23: 2
 - 24: 2
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
