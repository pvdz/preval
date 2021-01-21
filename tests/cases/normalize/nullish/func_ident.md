# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
function f() {
  return $("foo"??foo);
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
      tmpArg = foo;
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

## Output

`````js filename=intro
function f() {
  var tmpArg;
  var tmpNullish;
  var tmpTernaryTest;
  tmpNullish = 'foo';
  tmpTernaryTest = tmpNullish == null;
  if (tmpTernaryTest) {
    tmpArg = foo;
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

## Result

Should call `$` with:
 - 0: "foo"
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
