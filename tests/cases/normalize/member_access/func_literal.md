# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
function f() {
  return $('foo'.length);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpArg;
  {
    tmpArg = 'foo'.length;
    let tmpReturnArg = $(tmpArg);
    return tmpReturnArg;
  }
}
var tmpArg$1;
('<hoisted var `tmpArg$1` decl without init>');
tmpArg$1 = f();
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f() {
  var tmpArg;
  tmpArg = 'foo'.length;
  let tmpReturnArg = $(tmpArg);
  return tmpReturnArg;
}
var tmpArg$1;
tmpArg$1 = f();
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
