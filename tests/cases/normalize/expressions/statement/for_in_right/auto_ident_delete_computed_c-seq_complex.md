# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> normalize > expressions > statement > for_in_right > auto_ident_delete_computed_c-seq_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (let x in delete ($(1), $(2), $(arg))[$("y")]);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  $(1);
  $(2);
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $('y');
  const tmpForInDeclRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  $(1);
  $(2);
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $('y');
  const tmpForInDeclRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a, arg);
`````

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