# Preval test case

# first_defaults_to_second.md

> Normalize > Defaults > First defaults to second
>
> Rewrite function param defaults to equivalent body code

TDZ case

## Options

TDZ errors are not properly emulated so a n eval mismatch is expected

- skipEval

## Input

`````js filename=intro
function f(a = b, b = "bar") { 
  return [a, b]; 
}

$(f()); // runtime error
$(f('x')); // [x, bar]
$(f(undefined, 'y')); // runtime error
$(f('x', 'y')); // [x, y]
`````

## Pre Normal

`````js filename=intro
let f = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let a = tmpParamBare === undefined ? b : tmpParamBare;
  let b = tmpParamBare$1 === undefined ? `bar` : tmpParamBare$1;
  return [a, b];
};
$(f());
$(f(`x`));
$(f(undefined, `y`));
$(f(`x`, `y`));
`````

## Normalized

`````js filename=intro
let f = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    a = b;
  } else {
    a = tmpParamBare;
  }
  let b = undefined;
  const tmpIfTest$1 = tmpParamBare$1 === undefined;
  if (tmpIfTest$1) {
    b = `bar`;
  } else {
    b = tmpParamBare$1;
  }
  const tmpReturnArg = [a, b];
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(`x`);
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f(undefined, `y`);
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = f(`x`, `y`);
tmpCallCallee$5(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const f = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    throw `Preval: Cannot access \`b\` before initialization`;
  } else {
    let b = undefined;
    const tmpIfTest$1 = tmpParamBare$1 === undefined;
    if (tmpIfTest$1) {
      b = `bar`;
    } else {
      b = tmpParamBare$1;
    }
    const tmpReturnArg = [tmpParamBare, b];
    return tmpReturnArg;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(`x`);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f(undefined, `y`);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 = f(`x`, `y`);
$(tmpCalleeParam$5);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
