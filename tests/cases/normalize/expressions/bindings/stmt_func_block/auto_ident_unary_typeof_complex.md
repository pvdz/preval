# Preval test case

# auto_ident_unary_typeof_complex.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_unary_typeof_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let arg = 1;

    let a = typeof $(arg);
    $(a, arg);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let arg = 1;
    const tmpUnaryArg = $(arg);
    let a = typeof tmpUnaryArg;
    $(a, arg);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpUnaryArg = $(1);
  let a = typeof tmpUnaryArg;
  $(a, 1);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
