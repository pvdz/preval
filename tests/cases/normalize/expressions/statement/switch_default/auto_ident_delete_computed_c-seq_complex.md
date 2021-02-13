# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> normalize > expressions > statement > switch_default > auto_ident_delete_computed_c-seq_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    delete ($(1), $(2), $(arg))[$("y")];
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
{
  const tmpIfTest = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest) {
    $(1);
    $(2);
    const tmpDeleteCompObj = $(arg);
    const tmpDeleteCompProp = $('y');
    delete tmpDeleteCompObj[tmpDeleteCompProp];
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 0;
{
  const tmpIfTest = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest) {
    $(1);
    $(2);
    const tmpDeleteCompObj = $(arg);
    const tmpDeleteCompProp = $('y');
    delete tmpDeleteCompObj[tmpDeleteCompProp];
  }
}
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - 5: 'y'
 - 6: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
