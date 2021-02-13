# Preval test case

# auto_ident_unary_void_simple.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_unary_void_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let arg = 1;

  let a = void arg;
  $(a, arg);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let arg = 1;
  let a = undefined;
  $(a, arg);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let arg = 1;
  let a = undefined;
  $(a, arg);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: undefined, 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
