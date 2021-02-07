# Preval test case

# auto_ident_delete_prop_s-seq.md

> normalize > expressions > assignments > do_while > auto_ident_delete_prop_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = delete ($(1), $(2), x).y));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
  $(1);
  $(2);
  const tmpDeleteObj = x;
  const tmpNestedComplexRhs = delete tmpDeleteObj.y;
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
  $(1);
  $(2);
  const tmpDeleteObj = x;
  const tmpNestedComplexRhs = delete tmpDeleteObj.y;
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 100
 - 5: 1
 - 6: 2
 - 7: 100
 - 8: 1
 - 9: 2
 - 10: 100
 - 11: 1
 - 12: 2
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: 100
 - 20: 1
 - 21: 2
 - 22: 100
 - 23: 1
 - 24: 2
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
