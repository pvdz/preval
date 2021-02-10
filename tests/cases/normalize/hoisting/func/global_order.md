# Preval test case

# global_order.md

> normalize > hoisting > func > global_order
>
> How do we normalize multiple func decls on the same level?

#TODO

## Input

`````js filename=intro
$(f(), g(), h());

function f() { return $(); }
function g() { return $(); }
function h() { return $(); }
`````

## Normalized

`````js filename=intro
function f() {
  const tmpReturnArg = $();
  return tmpReturnArg;
}
function g() {
  const tmpReturnArg$1 = $();
  return tmpReturnArg$1;
}
function h() {
  const tmpReturnArg$2 = $();
  return tmpReturnArg$2;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = g();
const tmpCalleeParam$2 = h();
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 
 - 2: 
 - 3: 
 - 4: undefined, undefined, undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
