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
  'use strict';
  return $();
}
var tmpArg;
('use strict');
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  return $();
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
