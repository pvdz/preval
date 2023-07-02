# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > While > Auto ident cond c-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = (10, 20, $(30)) ? (40, 50, 60) : $($(100)))) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = (10, 20, $(30)) ? (40, 50, 60) : $($(100)))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest$1 = $(30);
  if (tmpIfTest$1) {
    a = 60;
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
let a = 60;
let $tmpLoopUnrollCheck = true;
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  $(100);
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
  if (a) {
    $(100);
  } else {
    $tmpLoopUnrollCheck = false;
  }
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 = $(30);
    if (tmpIfTest$2) {
      a = 60;
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
} else {
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 100
 - 3: 30
 - 4: 100
 - 5: 30
 - 6: 100
 - 7: 30
 - 8: 100
 - 9: 30
 - 10: 100
 - 11: 30
 - 12: 100
 - 13: 30
 - 14: 100
 - 15: 30
 - 16: 100
 - 17: 30
 - 18: 100
 - 19: 30
 - 20: 100
 - 21: 30
 - 22: 100
 - 23: 30
 - 24: 100
 - 25: 30
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
