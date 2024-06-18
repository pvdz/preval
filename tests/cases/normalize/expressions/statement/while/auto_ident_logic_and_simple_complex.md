# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > While > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while (1 && $($(1))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (1 && $($(1))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = 1;
while (true) {
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    tmpIfTest = tmpCallCallee(tmpCalleeParam);
    if (tmpIfTest) {
      $(100);
      tmpIfTest = 1;
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
const tmpClusterSSA_tmpIfTest = $(tmpCalleeParam);
if (tmpClusterSSA_tmpIfTest) {
  $(100);
  while ($LOOP_UNROLL_10) {
    const tmpCalleeParam$1 = $(1);
    const tmpClusterSSA_tmpIfTest$1 = $(tmpCalleeParam$1);
    if (tmpClusterSSA_tmpIfTest$1) {
      $(100);
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
const a = $( 1 );
const b = $( a );
if (b) {
  $( 100 );
  while ($LOOP_UNROLL_10) {
    const c = $( 1 );
    const d = $( c );
    if (d) {
      $( 100 );
    }
    else {
      break;
    }
  }
}
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 100
 - 4: 1
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 1
 - 15: 100
 - 16: 1
 - 17: 1
 - 18: 100
 - 19: 1
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
