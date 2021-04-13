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

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpArgumentsAny = arguments;
  let a = $$0;
  debugger;
  $(tmpArgumentsAny[0]);
};
f();
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpArgumentsAny = arguments;
  let a = $$0;
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = tmpArgumentsAny[0];
  tmpCallCallee(tmpCalleeParam);
  return undefined;
};
f();
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpArgumentsAny = arguments;
  debugger;
  const tmpCalleeParam = tmpArgumentsAny[0];
  $(tmpCalleeParam);
  return undefined;
};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
