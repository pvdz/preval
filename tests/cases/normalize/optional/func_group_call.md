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
  var tmpTernaryAlternate;
  var tmpTernaryTest;
  1;
  2;
  tmpOptionalChaining = $();
  tmpTernaryTest = tmpOptionalChaining == null;
  let y;
  if (tmpTernaryTest) {
    y = undefined;
  } else {
    tmpTernaryAlternate = tmpOptionalChaining();
    y = tmpTernaryAlternate;
  }
  {
    let tmpReturnArg = $(y);
    return tmpReturnArg;
  }
}
var tmpArg;
('<hoisted func decl `f`>');
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  var tmpOptionalChaining;
  var tmpTernaryAlternate;
  var tmpTernaryTest;
  tmpOptionalChaining = $();
  tmpTernaryTest = tmpOptionalChaining == null;
  let y;
  if (tmpTernaryTest) {
    y = undefined;
  } else {
    tmpTernaryAlternate = tmpOptionalChaining();
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
 - 0: 
 - 1: null
 - 2: null
 - 3: undefined

Normalized calls: Same

Final output calls: Same
