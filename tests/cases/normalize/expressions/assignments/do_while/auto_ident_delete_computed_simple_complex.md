# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident delete computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = delete arg[$("y")]));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = delete arg[$(`y`)];
  }
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  $(100);
  const tmpDeleteCompObj = arg;
  const tmpDeleteCompProp = $(`y`);
  const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
  a = tmpNestedComplexRhs;
  tmpDoWhileFlag = tmpNestedComplexRhs;
}
$(a, arg);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
const arg = { y: 1 };
while (tmpDoWhileFlag) {
  $(100);
  const tmpDeleteCompProp = $(`y`);
  const tmpNestedComplexRhs = delete arg[tmpDeleteCompProp];
  a = tmpNestedComplexRhs;
  tmpDoWhileFlag = tmpNestedComplexRhs;
}
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'y'
 - 3: 100
 - 4: 'y'
 - 5: 100
 - 6: 'y'
 - 7: 100
 - 8: 'y'
 - 9: 100
 - 10: 'y'
 - 11: 100
 - 12: 'y'
 - 13: 100
 - 14: 'y'
 - 15: 100
 - 16: 'y'
 - 17: 100
 - 18: 'y'
 - 19: 100
 - 20: 'y'
 - 21: 100
 - 22: 'y'
 - 23: 100
 - 24: 'y'
 - 25: 100
 - 26: 'y'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
