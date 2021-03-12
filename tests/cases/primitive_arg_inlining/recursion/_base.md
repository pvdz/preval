# Preval test case

# _base.md

> Primitive arg inlining > Recursion > Base
>
> Recursion problems

#TODO

## Options

- cloneLimit=5

## Input

`````js filename=intro
function f(n) {
  return f(n + 1);
}
$(f(0));
`````

## Normalized

`````js filename=intro
let f = function (n) {
  const tmpCallCallee = f;
  const tmpCalleeParam = n + 1;
  const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(0);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function (n) {
  const tmpCalleeParam = n + 1;
  const tmpReturnArg = f(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpCalleeParam$1 = f(0);
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Maximum call stack size exceeded ]>')

Normalized calls: Same

Final output calls: Same
