# Preval test case

# second_defaults_to_first.md

> Normalize > Defaults > Second defaults to first
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = "foo", b = a) { 
  return [a, b]; 
}

$(f()); // [foo, foo]
$(f('x')); // [x, x]
$(f(undefined, 'y')); // [foo, y]
$(f('x', 'y')); // [x, y]
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault, tmpParamDefault$1) {
  let a = tmpParamDefault === undefined ? 'foo' : tmpParamDefault;
  let b = tmpParamDefault$1 === undefined ? a : tmpParamDefault$1;
  return [a, b];
};
$(f());
$(f('x'));
$(f(undefined, 'y'));
$(f('x', 'y'));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault, tmpParamDefault$1) {
  let a = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    a = 'foo';
  } else {
    a = tmpParamDefault;
  }
  let b = undefined;
  const tmpIfTest$1 = tmpParamDefault$1 === undefined;
  if (tmpIfTest$1) {
    b = a;
  } else {
    b = tmpParamDefault$1;
  }
  const tmpReturnArg = [a, b];
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f('x');
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f(undefined, 'y');
tmpCallCallee$2(tmpCalleeParam$2);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f('x', 'y');
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault, tmpParamDefault$1) {
  let a = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    a = 'foo';
  } else {
    a = tmpParamDefault;
  }
  let b = undefined;
  const tmpIfTest$1 = tmpParamDefault$1 === undefined;
  if (tmpIfTest$1) {
    b = a;
  } else {
    b = tmpParamDefault$1;
  }
  const tmpReturnArg = [a, b];
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 = f('x');
$(tmpCalleeParam$1);
const tmpCalleeParam$2 = f(undefined, 'y');
$(tmpCalleeParam$2);
const tmpCalleeParam$3 = f('x', 'y');
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['foo', 'foo']
 - 2: ['x', 'x']
 - 3: ['foo', 'y']
 - 4: ['x', 'y']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
