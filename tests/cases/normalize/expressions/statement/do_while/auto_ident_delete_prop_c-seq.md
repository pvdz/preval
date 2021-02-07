# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > statement > do_while > auto_ident_delete_prop_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (delete ($(1), $(2), $(x)).y);
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
  const tmpDeleteObj = $(x);
  tmpDoWhileTest = delete tmpDeleteObj.y;
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
  const tmpDeleteObj = $(x);
  tmpDoWhileTest = delete tmpDeleteObj.y;
} while (tmpDoWhileTest);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - 5: 100
 - 6: 1
 - 7: 2
 - 8: {}
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: {}
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: {}
 - 17: 100
 - 18: 1
 - 19: 2
 - 20: {}
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: {}
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
