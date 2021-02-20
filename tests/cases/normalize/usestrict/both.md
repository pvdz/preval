# Preval test case

# both.md

> Normalize > Usestrict > Both
>
> Make sure the directive is not kept because of its special status

## Input

`````js filename=intro
"use strict";
function f() {
  "use strict";
  return $();
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpReturnArg = $();
  return tmpReturnArg;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpReturnArg = $();
  return tmpReturnArg;
}
const tmpCalleeParam = f();
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
