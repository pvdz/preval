# Preval test case

# auto_ident_func_id.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_func_id
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = function f() {};
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let a = function f() {};
    $(a);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let a = function f() {};
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
