# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Statement > While > Auto ident cond complex s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($(1) ? (40, 50, 60) : $($(100))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ($(1) ? (40, 50, 60) : $($(100))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    tmpIfTest = 60;
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
let tmpIfTest /*:unknown*/ = 1;
const tmpIfTest$1 /*:unknown*/ = $(1);
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  tmpIfTest = $(tmpCalleeParam);
}
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    let tmpIfTest$2 /*:unknown*/ = 1;
    const tmpIfTest$4 /*:unknown*/ = $(1);
    if (tmpIfTest$4) {
    } else {
      const tmpCalleeParam$1 /*:unknown*/ = $(100);
      tmpIfTest$2 = $(tmpCalleeParam$1);
    }
    if (tmpIfTest$2) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
const b = $( 1 );
if (b) {

}
else {
  const c = $( 100 );
  a = $( c );
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    let d = 1;
    const e = $( 1 );
    if (e) {

    }
    else {
      const f = $( 100 );
      d = $( f );
    }
    if (d) {

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
 - 2: 100
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 100
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 100
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 100
 - 19: 1
 - 20: 100
 - 21: 1
 - 22: 100
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
