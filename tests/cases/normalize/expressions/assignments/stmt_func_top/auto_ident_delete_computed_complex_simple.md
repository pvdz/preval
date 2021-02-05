# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > assignments > stmt_func_top > auto_ident_delete_computed_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let x = { y: 1 };

  let a = { a: 999, b: 1000 };
  a = delete $(x)["y"];
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
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
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
  a = delete tmpDeleteCompObj.y;
  $(a, x);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: true, {}
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
