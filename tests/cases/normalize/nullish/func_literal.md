# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
function f() {
  return $('foo'??length);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpArg;
  var tmpNullish;
  var tmpTernaryTest;
  {
    tmpNullish = 'foo';
    tmpTernaryTest = tmpNullish == null;
    if (tmpTernaryTest) {
      tmpArg = length;
    } else {
      tmpArg = tmpNullish;
    }
    let tmpStmtArg = $(tmpArg);
    return tmpStmtArg;
  }
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````

## Uniformed

`````js filename=intro
function x() {
  var x;
  var x;
  var x;
  {
    x = 'str';
    x = x * x;
    if (x) {
      x = x;
    } else {
      x = x;
    }
    var x = x(x);
    return x;
  }
}
var x;
x = x();
x(x);
`````

## Output

`````js filename=intro
function f() {
  var tmpArg;
  var tmpNullish;
  var tmpTernaryTest;
  tmpNullish = 'foo';
  tmpTernaryTest = tmpNullish == null;
  if (tmpTernaryTest) {
    tmpArg = length;
  } else {
    tmpArg = tmpNullish;
  }
  let tmpStmtArg = $(tmpArg);
  return tmpStmtArg;
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````
