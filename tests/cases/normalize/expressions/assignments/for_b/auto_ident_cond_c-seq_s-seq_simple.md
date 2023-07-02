# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > For b > Auto ident cond c-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))); $(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ((a = (10, 20, $(30)) ? (40, 50, 60) : $($(100)))) {
    $(1);
  }
}
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
    $(1);
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
  $(1);
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
  if (a) {
    $(1);
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
      $(1);
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
 - 2: 1
 - 3: 30
 - 4: 1
 - 5: 30
 - 6: 1
 - 7: 30
 - 8: 1
 - 9: 30
 - 10: 1
 - 11: 30
 - 12: 1
 - 13: 30
 - 14: 1
 - 15: 30
 - 16: 1
 - 17: 30
 - 18: 1
 - 19: 30
 - 20: 1
 - 21: 30
 - 22: 1
 - 23: 30
 - 24: 1
 - 25: 30
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
