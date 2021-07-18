# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident delete computed c-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (delete ($(1), $(2), $(arg))[$("y")]);
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
    tmpDoWhileFlag = delete ($(1), $(2), $(arg))[$(`y`)];
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
  $(1);
  $(2);
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $(`y`);
  tmpDoWhileFlag = delete tmpDeleteCompObj[tmpDeleteCompProp];
}
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  $(100);
  $(1);
  $(2);
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $(`y`);
  tmpDoWhileFlag = delete tmpDeleteCompObj[tmpDeleteCompProp];
}
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - 5: 'y'
 - 6: 100
 - 7: 1
 - 8: 2
 - 9: {}
 - 10: 'y'
 - 11: 100
 - 12: 1
 - 13: 2
 - 14: {}
 - 15: 'y'
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: {}
 - 20: 'y'
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: {}
 - 25: 'y'
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
