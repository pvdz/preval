# Preval test case

# auto_ident_upd_mi_simple.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_upd_mi_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = 1;

  let a = --b;
  $(a, b);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = 1;
  b = b - 1;
  let a = b;
  $(a, b);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let b = 1;
  b = b - 1;
  let a = b;
  $(a, b);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0, 0
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
