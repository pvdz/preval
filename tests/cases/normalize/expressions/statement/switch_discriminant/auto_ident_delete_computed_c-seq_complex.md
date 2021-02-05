# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> normalize > expressions > statement > switch_discriminant > auto_ident_delete_computed_c-seq_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
switch (delete ($(1), $(2), $(x))[$("y")]) {
  default:
    $(100);
}
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteCompObj = $(x);
const tmpDeleteCompProp = $('y');
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
$(1);
$(2);
const tmpDeleteCompObj = $(x);
const tmpDeleteCompProp = $('y');
delete tmpDeleteCompObj[tmpDeleteCompProp];
$(100);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 'y'
 - 5: 100
 - 6: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
