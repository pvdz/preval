# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > statement > switch_discriminant > auto_ident_delete_computed_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
switch (delete $(x)["y"]) {
  default:
    $(100);
}
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = $(x);
const tmpDeleteCompProp = 'y';
const tmpSwitchTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
{
  let tmpFallthrough = false;
  {
    ('default case:');
    $(100);
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = $(x);
delete tmpDeleteCompObj.y;
$(100);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 100
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
