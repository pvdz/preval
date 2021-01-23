# Preval test case

# global_group_literal.md

> normalize > member_access > global_group_literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
function f() {
  const y = (1, 2, 3)?.foo
  return $(y);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpOptionalChaining;
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  1;
  2;
  tmpOptionalChaining = 3;
  tmpTernaryTest = tmpOptionalChaining == null;
  let y;
  if (tmpTernaryTest) {
    y = undefined;
  } else {
    tmpTernaryAlternate = tmpOptionalChaining.foo;
    y = tmpTernaryAlternate;
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
  var tmpOptionalChaining;
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  tmpOptionalChaining = 3;
  tmpTernaryTest = tmpOptionalChaining == null;
  let y;
  if (tmpTernaryTest) {
    y = undefined;
  } else {
    tmpTernaryAlternate = tmpOptionalChaining.foo;
    y = tmpTernaryAlternate;
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
 - 0: null
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
