# Preval test case

# mutable_param.md

> function > mutable_param
>
> Param names can be written to

#TODO

## Input

`````js filename=intro
function f({x: a}) {
  a = $(10);
  return a;
}
$(f({x: 1}));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let a = tmpParamPattern.x;
  a = $(10);
  return a;
}
var tmpArg;
var tmpArg$1;
('<hoisted func decl `f`>');
tmpArg$1 = { x: 1 };
tmpArg = f(tmpArg$1);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let a = tmpParamPattern.x;
  a = $(10);
  return a;
}
var tmpArg;
var tmpArg$1;
tmpArg$1 = { x: 1 };
tmpArg = f(tmpArg$1);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: 10
 - 2: undefined

Normalized calls: Same

Final output calls: Same
