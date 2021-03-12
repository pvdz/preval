# Preval test case

# _base.md

> Normalize > Defaults > Base
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = "foo") { 
  return a; 
}

$(f('x'));
$(f('y'));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let a = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    a = 'foo';
    return a;
  } else {
    a = tmpParamDefault;
    return a;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f('x');
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f('y');
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    return 'foo';
  } else {
    return tmpParamDefault;
  }
};
const tmpCalleeParam = f('x');
$(tmpCalleeParam);
const tmpCalleeParam$1 = f('y');
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - 2: 'y'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
