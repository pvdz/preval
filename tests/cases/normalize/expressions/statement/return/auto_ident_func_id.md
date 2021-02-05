# Preval test case

# auto_ident_func_id.md

> normalize > expressions > statement > return > auto_ident_func_id
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return function f() {};
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpReturnArg = function f_1() {};
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
function f() {
  const tmpReturnArg = function f_1() {};
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
