# Preval test case

# global_group_literal.md

> normalize > member_access > global_group_literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
function f() {
  const y = (1, 2, 3)??foo
  return $(y);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpNullish;
  var tmpTernaryTest;
  1;
  2;
  tmpNullish = 3;
  tmpTernaryTest = tmpNullish == null;
  let y;
  if (tmpTernaryTest) {
    y = foo;
  } else {
    y = tmpNullish;
  }
  {
    let tmpReturnArg = $(y);
    return tmpReturnArg;
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
  tmpNullish = 3;
  tmpTernaryTest = tmpNullish == null;
  let y;
  if (tmpTernaryTest) {
    y = foo;
  } else {
    y = tmpNullish;
  }
  let tmpReturnArg = $(y);
  return tmpReturnArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
