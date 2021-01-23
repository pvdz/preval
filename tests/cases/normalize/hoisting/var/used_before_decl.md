# Preval test case

# used_before_decl.md

> normalize > hoisting > var > used_before_decl
>
> Hoisting a var puts the var declaration at the top while actually invoking the initialization at the point of code. Normalization should fix this.

#TODO

## Input

`````js filename=intro
function f() {
  a = $();
  var a = $();
  return a;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var a;
  a = $();
  a = $();
  return a;
}
var tmpArg;
('<hoisted var `tmpArg` decl without init>');
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  var a;
  a = $();
  a = $();
  return a;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: 
 - 2: null
 - 3: undefined

Normalized calls: Same

Final output calls: Same
