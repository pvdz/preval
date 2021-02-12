# Preval test case

# auto_ident_unary_excl_complex.md

> normalize > expressions > assignments > stmt_func_top > auto_ident_unary_excl_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = !$(100);
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  const tmpUnaryArg = $(100);
  a = !tmpUnaryArg;
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  const tmpUnaryArg = $(100);
  a = !tmpUnaryArg;
  $(a);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: false
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
