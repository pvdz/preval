# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Do while > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = ($(1), $(2), $(x))));
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = ($(1), $(2), $(x));
  }
}
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  $(100);
  $(1);
  $(2);
  const tmpNestedComplexRhs = $(x);
  a = tmpNestedComplexRhs;
  tmpDoWhileFlag = tmpNestedComplexRhs;
}
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  $(100);
  $(1);
  $(2);
  const tmpNestedComplexRhs = $(1);
  a = tmpNestedComplexRhs;
  tmpDoWhileFlag = tmpNestedComplexRhs;
}
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 100
 - 6: 1
 - 7: 2
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: 1
 - 17: 100
 - 18: 1
 - 19: 2
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
