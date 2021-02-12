# Preval test case

# auto_ident_delete_prop_complex.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_delete_prop_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let x = { y: 1 };

  let a = delete $(x).y;
  $(a, x);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let x = { y: 1 };
  const tmpDeleteObj = $(x);
  let a = delete tmpDeleteObj.y;
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
  const tmpDeleteObj = $(x);
  let a = delete tmpDeleteObj.y;
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
