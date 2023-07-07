# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > While > Auto ident cond c-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100)))) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100)))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest$1 = $(30);
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
let a = { a: 999, b: 1000 };
let $tmpLoopUnrollCheck = $LOOP_UNROLL_10;
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  a = $(60);
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
if (a) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
while ($tmpLoopUnrollCheck) {
  const tmpIfTest$2 = $(30);
  if (tmpIfTest$2) {
    a = $(60);
  } else {
    const tmpCalleeParam$1 = $(100);
    a = $(tmpCalleeParam$1);
  }
  if (a) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: 100
 - 4: 30
 - 5: 60
 - 6: 100
 - 7: 30
 - 8: 60
 - 9: 100
 - 10: 30
 - 11: 60
 - 12: 100
 - 13: 30
 - 14: 60
 - 15: 100
 - 16: 30
 - 17: 60
 - 18: 100
 - 19: 30
 - 20: 60
 - 21: 100
 - 22: 30
 - 23: 60
 - 24: 100
 - 25: 30
 - 26: 60
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
