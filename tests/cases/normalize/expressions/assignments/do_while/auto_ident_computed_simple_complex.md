# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = b[$("c")]));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = b[$(`c`)];
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  $(100);
  const tmpCompObj = b;
  const tmpCompProp = $(`c`);
  const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
  a = tmpNestedComplexRhs;
  tmpDoWhileFlag = tmpNestedComplexRhs;
}
$(a, b);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
const b = { c: 1 };
while (tmpDoWhileFlag) {
  $(100);
  const tmpCompProp = $(`c`);
  const tmpNestedComplexRhs = b[tmpCompProp];
  a = tmpNestedComplexRhs;
  tmpDoWhileFlag = tmpNestedComplexRhs;
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'c'
 - 3: 100
 - 4: 'c'
 - 5: 100
 - 6: 'c'
 - 7: 100
 - 8: 'c'
 - 9: 100
 - 10: 'c'
 - 11: 100
 - 12: 'c'
 - 13: 100
 - 14: 'c'
 - 15: 100
 - 16: 'c'
 - 17: 100
 - 18: 'c'
 - 19: 100
 - 20: 'c'
 - 21: 100
 - 22: 'c'
 - 23: 100
 - 24: 'c'
 - 25: 100
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
