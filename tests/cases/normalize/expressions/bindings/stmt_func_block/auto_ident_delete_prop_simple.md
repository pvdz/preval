# Preval test case

# auto_ident_delete_prop_simple.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_delete_prop_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let arg = { y: 1 };

    let a = delete arg.y;
    $(a, arg);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let arg = { y: 1 };
    let a = delete arg.y;
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
  let arg = { y: 1 };
  let a = delete arg.y;
  $(a, arg);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true, {}
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
