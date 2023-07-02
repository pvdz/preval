# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > While > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
while ((a = ($(1), $(2), $(x)))) $(100);
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
while ((a = ($(1), $(2), $(x)))) $(100);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
while (true) {
  $(1);
  $(2);
  a = $(x);
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let $tmpLoopUnrollCheck = true;
$(1);
$(2);
let a = $(1);
if (a) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(1);
    $(2);
    a = $(1);
    if (a) {
      $(100);
    } else {
      break;
    }
  }
} else {
}
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 100
 - 9: 1
 - 10: 2
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 2
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 100
 - 21: 1
 - 22: 2
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
