# Preval test case

# auto_ident_unary_complex.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_unary_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let x = 1;

  let a = typeof $(x);
  $(a, x);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let x = 1;
  const tmpUnaryArg = $(x);
  let a = typeof tmpUnaryArg;
  $(a, x);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
