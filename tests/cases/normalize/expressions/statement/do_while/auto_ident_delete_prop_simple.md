# Preval test case

# auto_ident_delete_prop_simple.md

> normalize > expressions > statement > do_while > auto_ident_delete_prop_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (delete x.y);
$(a, x);
`````

## Normalized

`````js filename=intro
var tmpDoWhileTest;
let x = { y: 1 };
let a = { a: 999, b: 1000 };
do {
  $(100);
  tmpDoWhileTest = delete x.y;
} while (tmpDoWhileTest);
$(a, x);
`````

## Output

`````js filename=intro
var tmpDoWhileTest;
let x = { y: 1 };
let a = { a: 999, b: 1000 };
do {
  $(100);
  tmpDoWhileTest = delete x.y;
} while (tmpDoWhileTest);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: 100
 - 5: 100
 - 6: 100
 - 7: 100
 - 8: 100
 - 9: 100
 - 10: 100
 - 11: 100
 - 12: 100
 - 13: 100
 - 14: 100
 - 15: 100
 - 16: 100
 - 17: 100
 - 18: 100
 - 19: 100
 - 20: 100
 - 21: 100
 - 22: 100
 - 23: 100
 - 24: 100
 - 25: 100
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
