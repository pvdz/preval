# Preval test case

# base.md

> Normalize > Arguments > Plain > Base
>
> Base case for the special `arguments` builtin

#TODO

## Input

`````js filename=intro
function f(a) {
  $(arguments[0]);
}
f();
`````

## Normalized

`````js filename=intro
let f = function (a) {
  const tmpCallCallee = $;
  const tmpCalleeParam = arguments[0];
  tmpCallCallee(tmpCalleeParam);
};
f();
`````

## Output

`````js filename=intro
const f = function (a) {
  const tmpCalleeParam = arguments[0];
  $(tmpCalleeParam);
};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
