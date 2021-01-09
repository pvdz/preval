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
        b = $(2)?.toString,
        c = b?.length
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
  var tmpTernaryTest_1;
  var tmpTernaryAlternate_1;
  const a = 10;
  tmpOptionalChaining = $(2);
  tmpTernaryTest = tmpOptionalChaining == null;
  const b = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = tmpOptionalChaining.toString), tmpTernaryAlternate);
  tmpTernaryTest_1 = b == null;
  const c = tmpTernaryTest_1 ? undefined : ((tmpTernaryAlternate_1 = b.length), tmpTernaryAlternate_1);
  {
    let tmpStmtArg = $(c);
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
  var tmpTernaryTest_1;
  var tmpTernaryAlternate_1;
  tmpOptionalChaining = $(2);
  tmpTernaryTest = tmpOptionalChaining == null;
  const b = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = tmpOptionalChaining.toString), tmpTernaryAlternate);
  tmpTernaryTest_1 = b == null;
  const c = tmpTernaryTest_1 ? undefined : ((tmpTernaryAlternate_1 = b.length), tmpTernaryAlternate_1);
  let tmpStmtArg = $(c);
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
