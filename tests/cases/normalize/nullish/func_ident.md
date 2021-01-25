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
  tmpNullish = 'foo';
  tmpTernaryTest = tmpNullish == null;
  if (tmpTernaryTest) {
    tmpArg = foo;
  } else {
    tmpArg = tmpNullish;
  }
  let tmpReturnArg = $(tmpArg);
  return tmpReturnArg;
}
var tmpArg$1;
('<hoisted func decl `f`>');
tmpArg$1 = f();
$(tmpArg$1);
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
  let tmpReturnArg = $(tmpArg);
  return tmpReturnArg;
}
var tmpArg$1;
tmpArg$1 = f();
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: "foo"
 - 1: "foo"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
