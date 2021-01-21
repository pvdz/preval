# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Assignment of a member expression where the object is a sequence

This could appear and is most likely a transformation artifact.

## Input

`````js filename=intro
function f() {
  var y;
  y = (1, 2, $())??foo;
  return $(y);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpNullish;
  var tmpTernaryTest;
  var y;
  1;
  2;
  tmpNullish = $();
  tmpTernaryTest = tmpNullish == null;
  if (tmpTernaryTest) {
    y = foo;
  } else {
    y = tmpNullish;
  }
  {
    let tmpStmtArg = $(y);
    return tmpStmtArg;
  }
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  var tmpNullish;
  var tmpTernaryTest;
  var y;
  tmpNullish = $();
  tmpTernaryTest = tmpNullish == null;
  if (tmpTernaryTest) {
    y = foo;
  } else {
    y = tmpNullish;
  }
  let tmpStmtArg = $(y);
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same
