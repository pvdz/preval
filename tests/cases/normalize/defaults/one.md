# Preval test case

# one.md

> normalize > defaults > one
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = "foo") { 
  return a; 
}

$(f('x'));
$(f());
`````

## Normalized

`````js filename=intro
function f($tdz$__a) {
  let a;
  {
    let ifTestTmp = $tdz$__a === undefined;
    if (ifTestTmp) {
      a = 'foo';
    } else {
      a = $tdz$__a;
    }
  }
  return a;
}
var tmpArg;
var tmpArg$1;
('<hoisted func decl `f`>');
tmpArg = f('x');
$(tmpArg);
tmpArg$1 = f();
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f($tdz$__a) {
  let a;
  let ifTestTmp = $tdz$__a === undefined;
  if (ifTestTmp) {
    a = 'foo';
  } else {
    a = $tdz$__a;
  }
  return a;
}
var tmpArg;
var tmpArg$1;
tmpArg = f('x');
$(tmpArg);
tmpArg$1 = f();
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: "foo"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
