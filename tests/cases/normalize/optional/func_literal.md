# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
function f() {
  return $('foo'?.length);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpArg;
  var tmpOptionalChaining;
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  {
    tmpOptionalChaining = 'foo';
    tmpTernaryTest = tmpOptionalChaining == null;
    if (tmpTernaryTest) {
      tmpArg = undefined;
    } else {
      tmpTernaryAlternate = tmpOptionalChaining.length;
      tmpArg = tmpTernaryAlternate;
    }
    let tmpStmtArg = $(tmpArg);
    return tmpStmtArg;
  }
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f() {
  var tmpArg;
  var tmpOptionalChaining;
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  tmpOptionalChaining = 'foo';
  tmpTernaryTest = tmpOptionalChaining == null;
  if (tmpTernaryTest) {
    tmpArg = undefined;
  } else {
    tmpTernaryAlternate = tmpOptionalChaining.length;
    tmpArg = tmpTernaryAlternate;
  }
  let tmpStmtArg = $(tmpArg);
  return tmpStmtArg;
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
