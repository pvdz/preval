# Preval test case

# auto_ident_func_id.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_func_id
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = function f() {};
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let a = function f_1() {};
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let a = function f_1() {};
  $(a);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function'
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
