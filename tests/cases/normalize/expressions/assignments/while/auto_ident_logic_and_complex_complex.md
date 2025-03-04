# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > While > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $($(1)) && $($(2)))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $($(1)) && $($(2)))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(2);
    a = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  a = $(tmpCalleeParam$1);
  if (a) {
    $(100);
    while ($LOOP_UNROLL_10) {
      const tmpCalleeParam$2 /*:unknown*/ = $(1);
      a = $(tmpCalleeParam$2);
      if (a) {
        const tmpCalleeParam$4 /*:unknown*/ = $(2);
        a = $(tmpCalleeParam$4);
        if (a) {
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
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 2 );
  b = $( c );
  if (b) {
    $( 100 );
    while ($LOOP_UNROLL_10) {
      const d = $( 1 );
      b = $( d );
      if (b) {
        const e = $( 2 );
        b = $( e );
        if (b) {
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
$( b );
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
