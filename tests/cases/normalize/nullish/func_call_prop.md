# Preval test case

# global_call_prop.md

> normalize > member_access > global_call_prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  return $(parseInt(15)??foo);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpArg;
  var tmpNullish;
  var tmpTernaryTest;
  {
    tmpNullish = parseInt(15);
    tmpTernaryTest = tmpNullish == null;
    if (tmpTernaryTest) {
      tmpArg = foo;
    } else {
      tmpArg = tmpNullish;
    }
    let tmpReturnArg = $(tmpArg);
    return tmpReturnArg;
  }
}
var tmpArg$1;
tmpArg$1 = f();
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f() {
  var tmpArg;
  var tmpNullish;
  var tmpTernaryTest;
  tmpNullish = parseInt(15);
  tmpTernaryTest = tmpNullish == null;
  if (tmpTernaryTest) {
    tmpArg = foo;
  } else {
    tmpArg = tmpNullish;
  }
  let tmpReturnArg = $(tmpArg);
  return tmpReturnArg;
}
var tmpArg$1;
tmpArg$1 = f();
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: 15
 - 1: 15
 - 2: undefined

Normalized calls: Same

Final output calls: Same
