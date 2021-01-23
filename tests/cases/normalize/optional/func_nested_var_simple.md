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
  var tmpTernaryAlternate;
  var tmpTernaryAlternate$1;
  var tmpTernaryTest;
  var tmpTernaryTest$1;
  const a = 10;
  tmpOptionalChaining = $(2);
  tmpTernaryTest = tmpOptionalChaining == null;
  let b;
  if (tmpTernaryTest) {
    b = undefined;
  } else {
    tmpTernaryAlternate = tmpOptionalChaining.toString;
    b = tmpTernaryAlternate;
  }
  tmpTernaryTest$1 = b == null;
  let c;
  if (tmpTernaryTest$1) {
    c = undefined;
  } else {
    tmpTernaryAlternate$1 = b.length;
    c = tmpTernaryAlternate$1;
  }
  {
    let tmpReturnArg = $(c);
    return tmpReturnArg;
  }
}
var tmpArg;
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpArg` decl without init>');
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  var tmpOptionalChaining;
  var tmpTernaryAlternate;
  var tmpTernaryAlternate$1;
  var tmpTernaryTest;
  var tmpTernaryTest$1;
  tmpOptionalChaining = $(2);
  tmpTernaryTest = tmpOptionalChaining == null;
  let b;
  if (tmpTernaryTest) {
    b = undefined;
  } else {
    tmpTernaryAlternate = tmpOptionalChaining.toString;
    b = tmpTernaryAlternate;
  }
  tmpTernaryTest$1 = b == null;
  let c;
  if (tmpTernaryTest$1) {
    c = undefined;
  } else {
    tmpTernaryAlternate$1 = b.length;
    c = tmpTernaryAlternate$1;
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
