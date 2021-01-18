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
  {
    tmpArg = { x: 1 };
    let tmpStmtArg = $(tmpArg);
    return tmpStmtArg;
  }
}
var tmpArg_1;
var tmpObjSpreadArg;
tmpObjSpreadArg = f();
tmpArg_1 = { ...tmpObjSpreadArg };
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f() {
  var tmpArg;
  tmpArg = { x: 1 };
  let tmpStmtArg = $(tmpArg);
  return tmpStmtArg;
}
var tmpArg_1;
var tmpObjSpreadArg;
tmpObjSpreadArg = f();
tmpArg_1 = { ...tmpObjSpreadArg };
$(tmpArg_1);
`````

## Result

Should call `$` with:
[[{ x: 1 }], [{}], null];

Normalized calls: Same

Final output calls: Same
