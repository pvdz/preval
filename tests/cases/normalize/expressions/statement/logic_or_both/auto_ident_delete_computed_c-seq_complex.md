# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> normalize > expressions > statement > logic_or_both > auto_ident_delete_computed_c-seq_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete ($(1), $(2), $(arg))[$("y")] || delete ($(1), $(2), $(arg))[$("y")];
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $('y');
const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
if (tmpIfTest) {
} else {
  $(1);
  $(2);
  const tmpDeleteCompObj$1 = $(arg);
  const tmpDeleteCompProp$1 = $('y');
  delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
}
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $('y');
const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
if (tmpIfTest) {
} else {
  $(1);
  $(2);
  const tmpDeleteCompObj$1 = $(arg);
  const tmpDeleteCompProp$1 = $('y');
  delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
}
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 'y'
 - 5: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
