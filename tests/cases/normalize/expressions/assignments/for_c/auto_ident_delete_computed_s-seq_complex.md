# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident delete computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = delete ($(1), $(2), arg)[$("y")]);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = delete ($(1), $(2), arg)[$('y')];
  }
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(1);
    $(2);
    const tmpDeleteCompObj = arg;
    const tmpDeleteCompProp = $('y');
    a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  } else {
    break;
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const arg = { y: 1 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(1);
    $(2);
    const tmpDeleteCompProp = $('y');
    a = delete arg[tmpDeleteCompProp];
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
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 'y'
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 'y'
 - 9: 1
 - 10: 1
 - 11: 2
 - 12: 'y'
 - 13: 1
 - 14: 1
 - 15: 2
 - 16: 'y'
 - 17: 1
 - 18: 1
 - 19: 2
 - 20: 'y'
 - 21: 1
 - 22: 1
 - 23: 2
 - 24: 'y'
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
