# Preval test case

# mutable_param.md

> function > mutable_param
>
> Param names can be written to

#TODO

## Input

`````js filename=intro
function f(a) {
  a = $(10);
  return a;
}
$(f());
`````

## Normalized

`````js filename=intro
function f(a) {
  a = $(10);
  return a;
}
var tmpArg;
('<hoisted func decl `f`>');
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f(a) {
  a = $(10);
  return a;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: 10
 - 2: undefined

Normalized calls: Same

Final output calls: Same
