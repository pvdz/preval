# Preval test case

# spread_call.md

> normalize > object > spread_call
>
> Spread arg that is simple should not change

#TODO

## Input

`````js filename=intro
function f(){
  return $({x: 1});
}
$({...f()});
`````

## Normalized

`````js filename=intro
function f() {
  var tmpArg;
  tmpArg = { x: 1 };
  let tmpReturnArg = $(tmpArg);
  return tmpReturnArg;
}
var tmpArg$1;
var tmpObjSpreadArg;
('<hoisted func decl `f`>');
tmpObjSpreadArg = f();
tmpArg$1 = { ...tmpObjSpreadArg };
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f() {
  var tmpArg;
  tmpArg = { x: 1 };
  let tmpReturnArg = $(tmpArg);
  return tmpReturnArg;
}
var tmpArg$1;
var tmpObjSpreadArg;
tmpObjSpreadArg = f();
tmpArg$1 = { ...tmpObjSpreadArg };
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: {"x":1}
 - 1: {"x":1}
 - 2: undefined

Normalized calls: Same

Final output calls: Same
