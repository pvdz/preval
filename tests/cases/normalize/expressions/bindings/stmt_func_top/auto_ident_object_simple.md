# Preval test case

# auto_ident_object_simple.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_object_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { x: 1, y: 2, z: 3 };
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let a = { x: 1, y: 2, z: 3 };
  $(a);
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
 - 1: { x: '1', y: '2', z: '3' }
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
