# Preval test case

# auto_ident_unary_plus_complex.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_unary_plus_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = +$(100);
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpUnaryArg = $(100);
  let a = +tmpUnaryArg;
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpUnaryArg = $(100);
  let a = +tmpUnaryArg;
  $(a);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
