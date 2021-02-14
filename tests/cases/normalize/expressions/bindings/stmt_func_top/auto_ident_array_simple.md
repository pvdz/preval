# Preval test case

# auto_ident_array_simple.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_array_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = [1, 2, 3];
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let a = [1, 2, 3];
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let a = [1, 2, 3];
  $(a);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
