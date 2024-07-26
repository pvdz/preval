# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Assignments > While > Auto ident cond complex c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $(1) ? (40, 50, $(60)) : $($(100)))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = $(1) ? (40, 50, $(60)) : $($(100)))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    a = $(60);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    a = tmpCallCallee(tmpCalleeParam);
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
let a = 1;
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  a = $(60);
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpIfTest$2 = $(1);
    if (tmpIfTest$2) {
      a = $(60);
    } else {
      const tmpCalleeParam$1 = $(100);
      a = $(tmpCalleeParam$1);
    }
    if (a) {
    } else {
      break;
    }
  }
} else {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
const b = $( 1 );
if (b) {
  a = $( 60 );
}
else {
  const c = $( 100 );
  a = $( c );
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const d = $( 1 );
    if (d) {
      a = $( 60 );
    }
    else {
      const e = $( 100 );
      a = $( e );
    }
    if (a) {

    }
    else {
      break;
    }
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 100
 - 4: 1
 - 5: 60
 - 6: 100
 - 7: 1
 - 8: 60
 - 9: 100
 - 10: 1
 - 11: 60
 - 12: 100
 - 13: 1
 - 14: 60
 - 15: 100
 - 16: 1
 - 17: 60
 - 18: 100
 - 19: 1
 - 20: 60
 - 21: 100
 - 22: 1
 - 23: 60
 - 24: 100
 - 25: 1
 - 26: 60
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
