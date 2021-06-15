# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Statement > For b > Auto ident delete computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; delete $(arg)[$("y")]; $(1));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  while (delete $(arg)[$(`y`)]) {
    $(1);
  }
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $(`y`);
  const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
while (true) {
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $(`y`);
  const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: 1
 - 4: {}
 - 5: 'y'
 - 6: 1
 - 7: {}
 - 8: 'y'
 - 9: 1
 - 10: {}
 - 11: 'y'
 - 12: 1
 - 13: {}
 - 14: 'y'
 - 15: 1
 - 16: {}
 - 17: 'y'
 - 18: 1
 - 19: {}
 - 20: 'y'
 - 21: 1
 - 22: {}
 - 23: 'y'
 - 24: 1
 - 25: {}
 - 26: 'y'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
