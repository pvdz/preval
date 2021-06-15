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

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let a = tmpParamBare === undefined ? `foo` : tmpParamBare;
  return a;
};
$(f(`x`));
$(f(`y`));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    a = `foo`;
    return a;
  } else {
    a = tmpParamBare;
    return a;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(`x`);
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(`y`);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    return `foo`;
  } else {
    return tmpParamBare;
  }
};
const tmpCalleeParam = f(`x`);
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(`y`);
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - 2: 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
