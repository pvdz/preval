# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > While > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($(1) ? (40, 50, $(60)) : $($(100))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ($(1) ? (40, 50, $(60)) : $($(100))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    tmpIfTest = $(60);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpIfTest = tmpCallCallee(tmpCalleeParam);
  }
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
let tmpIfTest = false;
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  tmpIfTest = $(60);
} else {
  const tmpCalleeParam = $(100);
  tmpIfTest = $(tmpCalleeParam);
}
if (tmpIfTest) {
  $(100);
  while ($LOOP_UNROLL_10) {
    let tmpIfTest$2 = false;
    const tmpIfTest$4 = $(1);
    if (tmpIfTest$4) {
      tmpIfTest$2 = $(60);
    } else {
      const tmpCalleeParam$1 = $(100);
      tmpIfTest$2 = $(tmpCalleeParam$1);
    }
    if (tmpIfTest$2) {
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
let a = false;
const b = $( 1 );
if (b) {
  a = $( 60 );
}
else {
  const c = $( 100 );
  a = $( c );
}
if (a) {
  $( 100 );
  while ($LOOP_UNROLL_10) {
    let d = false;
    const e = $( 1 );
    if (e) {
      d = $( 60 );
    }
    else {
      const f = $( 100 );
      d = $( f );
    }
    if (d) {
      $( 100 );
    }
    else {
      break;
    }
  }
}
const g = {
  a: 999,
  b: 1000,
};
$( g );
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
