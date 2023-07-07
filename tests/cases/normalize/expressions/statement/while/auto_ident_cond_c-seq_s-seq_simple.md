# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Statement > While > Auto ident cond c-seq s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((10, 20, $(30)) ? (40, 50, 60) : $($(100))) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((10, 20, $(30)) ? (40, 50, 60) : $($(100))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpIfTest$1 = $(30);
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
let $tmpLoopUnrollCheck = $LOOP_UNROLL_10;
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  $(100);
} else {
  const tmpCalleeParam = $(100);
  const tmpClusterSSA_tmpIfTest = $(tmpCalleeParam);
  if (tmpClusterSSA_tmpIfTest) {
    $(100);
  } else {
    $tmpLoopUnrollCheck = false;
  }
}
while ($tmpLoopUnrollCheck) {
  const tmpIfTest$4 = $(30);
  if (tmpIfTest$4) {
    $(100);
  } else {
    const tmpCalleeParam$1 = $(100);
    const tmpClusterSSA_tmpIfTest$2 = $(tmpCalleeParam$1);
    if (tmpClusterSSA_tmpIfTest$2) {
      $(100);
    } else {
      break;
    }
  }
}
const a = { a: 999, b: 1000 };
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
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
