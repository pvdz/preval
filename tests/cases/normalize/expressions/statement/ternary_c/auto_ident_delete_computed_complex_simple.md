# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > statement > ternary_c > auto_ident_delete_computed_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : delete $(x)["y"];
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpDeleteCompObj = $(x);
  const tmpDeleteCompProp = 'y';
  delete tmpDeleteCompObj[tmpDeleteCompProp];
}
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpDeleteCompObj = $(x);
  const tmpDeleteCompProp = 'y';
  delete tmpDeleteCompObj[tmpDeleteCompProp];
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: { y: '1' }
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
