# Preval test case

# return_call_builtin.md

> Function inlining > Return call builtin
>
> We should be able to inline certain functions

#TODO

## Input

`````js filename=intro
function f() {
  return $(10);
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpReturnArg = $(10);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpReturnArg = $(10);
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
