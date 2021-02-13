# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > statement > ternary_b > auto_ident_delete_computed_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(1) ? delete $(arg)["y"] : $(200);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = 'y';
  delete tmpDeleteCompObj[tmpDeleteCompProp];
} else {
  $(200);
}
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpDeleteCompObj = $(arg);
  delete tmpDeleteCompObj['y'];
} else {
  $(200);
}
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { y: '1' }
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same