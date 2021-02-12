# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > statement > stmt_func_top > auto_ident_delete_computed_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let x = { y: 1 };

  let a = { a: 999, b: 1000 };
  delete $(x)["y"];
  $(a, x);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let x = { y: 1 };
  let a = { a: 999, b: 1000 };
  const tmpDeleteCompObj = $(x);
  const tmpDeleteCompProp = 'y';
  delete tmpDeleteCompObj[tmpDeleteCompProp];
  $(a, x);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let x = { y: 1 };
  let a = { a: 999, b: 1000 };
  const tmpDeleteCompObj = $(x);
  const tmpDeleteCompProp = 'y';
  delete tmpDeleteCompObj[tmpDeleteCompProp];
  $(a, x);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: { a: '999', b: '1000' }, {}
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
