# Preval test case

# spread_member_call.md

> normalize > array > spread_member_call
>
> Spread arg that is simple should not change

#TODO

## Input

`````js filename=intro
const obj = {foo() { return $({ x: 1 }); }};
$({...obj.foo()});
`````

## Normalized

`````js filename=intro
var tmpArg_1;
var tmpObjSpreadArg;
const obj = {
  foo() {
    var tmpArg;
    {
      tmpArg = { x: 1 };
      let tmpStmtArg = $(tmpArg);
      return tmpStmtArg;
    }
  },
};
tmpObjSpreadArg = obj.foo();
tmpArg_1 = { ...tmpObjSpreadArg };
$(tmpArg_1);
`````

## Output

`````js filename=intro
var tmpArg_1;
var tmpObjSpreadArg;
const obj = {
  foo() {
    var tmpArg;
    tmpArg = { x: 1 };
    let tmpStmtArg = $(tmpArg);
    return tmpStmtArg;
  },
};
tmpObjSpreadArg = obj.foo();
tmpArg_1 = { ...tmpObjSpreadArg };
$(tmpArg_1);
`````