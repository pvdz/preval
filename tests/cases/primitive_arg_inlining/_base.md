# Preval test case

# _base.md

> Primitive arg inlining > Base
>
> Calling a function with a literal should clone the function and try to inline the arg with that literal.

#TODO

## Input

`````js filename=intro
function f(a) {
  return a;
}
$(f(1));
`````

## Normalized

`````js filename=intro
let f = function (a) {
  return a;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (a) {
  return a;
};
const tmpCalleeParam = f(1);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
