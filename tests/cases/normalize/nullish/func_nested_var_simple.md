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
        b = $(2)??toString,
        c = b??length
  return $(c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpNullish;
  var tmpTernaryTest;
  var tmpTernaryTest_1;
  const a = 10;
  tmpNullish = $(2);
  tmpTernaryTest = tmpNullish == null;
  {
    let b;
    if (tmpTernaryTest) {
      b = toString;
    } else {
      b = tmpNullish;
    }
  }
  b = b;
  tmpTernaryTest_1 = b == null;
  {
    let c;
    if (tmpTernaryTest_1) {
      c = length;
    } else {
      c = b;
    }
  }
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
  var tmpNullish;
  var tmpTernaryTest;
  var tmpTernaryTest_1;
  tmpNullish = $(2);
  tmpTernaryTest = tmpNullish == null;
  let b;
  if (tmpTernaryTest) {
    b = toString;
  } else {
    b = tmpNullish;
  }
  b = b;
  tmpTernaryTest_1 = b == null;
  let c;
  if (tmpTernaryTest_1) {
    c = length;
  } else {
    c = b;
  }
  let tmpStmtArg = $(c);
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
[[2], [null], [null], null];

Normalized calls: BAD?!
[[2], '<crash[ <ref> is not defined ]>'];

Final output calls: Same
