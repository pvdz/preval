# Preval test case

# global.md

> normalize > usestrict > global
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
