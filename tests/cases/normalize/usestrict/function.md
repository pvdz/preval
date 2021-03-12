# Preval test case

# function.md

> Normalize > Usestrict > Function
>
> Make sure the directive is not kept because of its special status

## Input

`````js filename=intro
function f() {
  "use strict";
  return $();
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpReturnArg = $();
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
