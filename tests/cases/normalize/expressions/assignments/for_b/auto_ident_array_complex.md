# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = [$(1), 2, $(3)]); $(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ((a = [$(1), 2, $(3)])) {
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpArrElement = $(1);
  const tmpArrElement$1 = 2;
  const tmpArrElement$3 = $(3);
  a = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
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
$(1);
$(3);
$(1);
$(1);
$(3);
$(1);
$(1);
$(3);
$(1);
$(1);
$(3);
$(1);
$(1);
$(3);
$(1);
$(1);
$(3);
$(1);
$(1);
$(3);
$(1);
$(1);
$(3);
$(1);
$(1);
$(3);
$(1);
$(1);
$(3);
$(1);
const tmpArrElement$1 = $(1);
const tmpArrElement$4 = $(3);
let a = [tmpArrElement$1, 2, tmpArrElement$4];
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpArrElement$2 = $(1);
  const tmpArrElement$5 = $(3);
  a = [tmpArrElement$2, 2, tmpArrElement$5];
  $(1);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 1
 - 4: 1
 - 5: 3
 - 6: 1
 - 7: 1
 - 8: 3
 - 9: 1
 - 10: 1
 - 11: 3
 - 12: 1
 - 13: 1
 - 14: 3
 - 15: 1
 - 16: 1
 - 17: 3
 - 18: 1
 - 19: 1
 - 20: 3
 - 21: 1
 - 22: 1
 - 23: 3
 - 24: 1
 - 25: 1
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
