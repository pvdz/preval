# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
function f() {
  const y = (1, 2, $())?.()
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
  tmpOptionalChaining = $();
  tmpTernaryTest = tmpOptionalChaining == null;
  {
    let y;
    if (tmpTernaryTest) {
      y = undefined;
    } else {
      tmpTernaryAlternate = tmpOptionalChaining();
      y = tmpTernaryAlternate;
    }
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
  var tmpOptionalChaining;
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  tmpOptionalChaining = $();
  tmpTernaryTest = tmpOptionalChaining == null;
  let y;
  if (tmpTernaryTest) {
    y = undefined;
  } else {
    tmpTernaryAlternate = tmpOptionalChaining();
    y = tmpTernaryAlternate;
  }
  let tmpStmtArg = $(y);
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
