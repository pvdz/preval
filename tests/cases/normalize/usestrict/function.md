# Preval test case

# global.md

> normalize > usestrict > global
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
function f() {
  'use strict';
  {
    let tmpStmtArg = $();
    return tmpStmtArg;
  }
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x() {
  'str';
  {
    var x = x();
    return x;
  }
}
var x;
x = x();
x(x);
`````

## Output

`````js filename=intro
function f() {
  let tmpStmtArg = $();
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
