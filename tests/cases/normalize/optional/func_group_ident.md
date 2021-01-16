# Preval test case

# global_group_ident.md

> normalize > member_access > global_group_ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
function f() {
  const a = {x: 1}
  const y = (1, a)?.x
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
  const a = { x: 1 };
  1;
  tmpOptionalChaining = a;
  tmpTernaryTest = tmpOptionalChaining == null;
  {
    let y;
    if (tmpTernaryTest) {
      y = undefined;
    } else {
      tmpTernaryAlternate = tmpOptionalChaining.x;
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
  const a = { x: 1 };
  tmpOptionalChaining = a;
  tmpTernaryTest = tmpOptionalChaining == null;
  let y;
  if (tmpTernaryTest) {
    y = undefined;
  } else {
    tmpTernaryAlternate = tmpOptionalChaining.x;
    y = tmpTernaryAlternate;
  }
  let tmpStmtArg = $(y);
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
