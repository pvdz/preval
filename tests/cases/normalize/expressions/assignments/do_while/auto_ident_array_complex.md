# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = [$(1), 2, $(3)]));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = [$(1), 2, $(3)];
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  $(100);
  const tmpArrElement = $(1);
  const tmpArrElement$1 = 2;
  const tmpArrElement$3 = $(3);
  const tmpNestedComplexRhs = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
  a = tmpNestedComplexRhs;
  tmpDoWhileFlag = tmpNestedComplexRhs;
}
$(a);
`````

## Output

`````js filename=intro
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
const tmpArrElement$3 = $(1);
const tmpArrElement$10 = $(3);
const tmpNestedComplexRhs$2 = [tmpArrElement$3, 2, tmpArrElement$10];
let a = tmpNestedComplexRhs$2;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpArrElement$1 = $(1);
  const tmpArrElement$4 = $(3);
  const tmpNestedComplexRhs$3 = [tmpArrElement$1, 2, tmpArrElement$4];
  a = tmpNestedComplexRhs$3;
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 3
 - 4: 100
 - 5: 1
 - 6: 3
 - 7: 100
 - 8: 1
 - 9: 3
 - 10: 100
 - 11: 1
 - 12: 3
 - 13: 100
 - 14: 1
 - 15: 3
 - 16: 100
 - 17: 1
 - 18: 3
 - 19: 100
 - 20: 1
 - 21: 3
 - 22: 100
 - 23: 1
 - 24: 3
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
