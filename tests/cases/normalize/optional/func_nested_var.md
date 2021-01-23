# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  const a = 10,
        b = (a, $(2))?.toString,
        c = (1, b)?.length
  return $(c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpOptionalChaining;
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  var tmpOptionalChaining_1;
  var tmpTernaryTest_1;
  var tmpTernaryAlternate_1;
  const a = 10;
  a;
  tmpOptionalChaining = $(2);
  tmpTernaryTest = tmpOptionalChaining == null;
  let b;
  if (tmpTernaryTest) {
    b = undefined;
  } else {
    tmpTernaryAlternate = tmpOptionalChaining.toString;
    b = tmpTernaryAlternate;
  }
  1;
  tmpOptionalChaining_1 = b;
  tmpTernaryTest_1 = tmpOptionalChaining_1 == null;
  let c;
  if (tmpTernaryTest_1) {
    c = undefined;
  } else {
    tmpTernaryAlternate_1 = tmpOptionalChaining_1.length;
    c = tmpTernaryAlternate_1;
  }
  {
    let tmpReturnArg = $(c);
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
  var tmpOptionalChaining_1;
  var tmpTernaryTest_1;
  var tmpTernaryAlternate_1;
  tmpOptionalChaining = $(2);
  tmpTernaryTest = tmpOptionalChaining == null;
  let b;
  if (tmpTernaryTest) {
    b = undefined;
  } else {
    tmpTernaryAlternate = tmpOptionalChaining.toString;
    b = tmpTernaryAlternate;
  }
  tmpOptionalChaining_1 = b;
  tmpTernaryTest_1 = tmpOptionalChaining_1 == null;
  let c;
  if (tmpTernaryTest_1) {
    c = undefined;
  } else {
    tmpTernaryAlternate_1 = tmpOptionalChaining_1.length;
    c = tmpTernaryAlternate_1;
  }
  let tmpReturnArg = $(c);
  return tmpReturnArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 1
 - 2: 1
 - 3: undefined

Normalized calls: Same

Final output calls: Same
