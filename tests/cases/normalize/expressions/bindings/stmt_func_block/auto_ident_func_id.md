# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident func id
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
  let a = function f$1() {};
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const a = function f$1() {};
  $(a);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
