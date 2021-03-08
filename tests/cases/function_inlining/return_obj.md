# Preval test case

# return_obj.md

> Function inlining > Return obj
>
> We should be able to inline certain functions

#TODO

## Input

`````js filename=intro
function f() {
  return {a: 10, b: 20, c: 30};
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpReturnArg = { a: 10, b: 20, c: 30 };
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpReturnArg = { a: 10, b: 20, c: 30 };
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '10', b: '20', c: '30' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same