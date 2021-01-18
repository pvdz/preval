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
  {
    let a;
    {
      let ifTestTmp = $tdz$__a === undefined;
      if (ifTestTmp) {
        a = 'foo';
      } else {
        a = $tdz$__a;
      }
    }
  }
  return a;
}
var tmpArg;
var tmpArg_1;
tmpArg = f('x');
$(tmpArg);
tmpArg_1 = f();
$(tmpArg_1);
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
var tmpArg_1;
tmpArg = f('x');
$(tmpArg);
tmpArg_1 = f();
$(tmpArg_1);
`````

## Result

Should call `$` with:
[['x'], ['foo'], null];

Normalized calls: BAD?!
[[20], [20], null];

Final output calls: Same
