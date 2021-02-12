# Preval test case

# auto_ident_call_complex.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_call_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = $($)(1);
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpCallCallee = $($);
  let a = tmpCallCallee(1);
  $(a);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam = f();
tmpCallCallee$1(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpCallCallee = $($);
  let a = tmpCallCallee(1);
  $(a);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
