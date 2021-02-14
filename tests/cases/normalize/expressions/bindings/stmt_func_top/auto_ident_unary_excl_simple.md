# Preval test case

# auto_ident_unary_excl_simple.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_unary_excl_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let arg = 1;

  let a = !arg;
  $(a, arg);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let arg = 1;
  let a = !arg;
  $(a, arg);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let a = !1;
  $(a, 1);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false, 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
