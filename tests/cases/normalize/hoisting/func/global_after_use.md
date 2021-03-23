# Preval test case

# global_after_use.md

> Normalize > Hoisting > Func > Global after use
>
> Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

#TODO

## Input

`````js filename=intro
$(f(1));
function f() { return $(2); }
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return $(2);
};
$(f(1));
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpReturnArg = $(2);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(2);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
