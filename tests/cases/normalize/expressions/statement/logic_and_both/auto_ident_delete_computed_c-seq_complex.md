# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> normalize > expressions > statement > logic_and_both > auto_ident_delete_computed_c-seq_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
delete ($(1), $(2), $(x))[$("y")] && delete ($(1), $(2), $(x))[$("y")];
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
const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteCompObj$1 = $(x);
  const tmpDeleteCompProp$1 = $('y');
  delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
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
const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteCompObj$1 = $(x);
  const tmpDeleteCompProp$1 = $('y');
  delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 'y'
 - 5: 1
 - 6: 2
 - 7: {}
 - 8: 'y'
 - 9: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
