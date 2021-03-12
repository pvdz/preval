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

## Pre Normal

`````js filename=intro
let f = function () {
  'use strict';
  return $();
};
('use strict');
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
