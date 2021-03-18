# Preval test case

# transitivity2.md

> Primitive arg inlining > Transitivity2
>
> Second attempt at trying to proc cloning cache

#TODO

## Input

`````js filename=intro
function f(a, b) {
  return $(a, b);
}
function g(b) {
  return $(f(1, b));
}
$(f(1, 2));
$(g(2)); // Should ultimately reuse the cloned func from the prev call
`````

## Pre Normal

`````js filename=intro
let f = function (a, b) {
  return $(a, b);
};
let g = function (b$1) {
  return $(f(1, b$1));
};
$(f(1, 2));
$(g(2));
`````

## Normalized

`````js filename=intro
let f = function (a, b) {
  const tmpReturnArg = $(a, b);
  return tmpReturnArg;
};
let g = function (b$1) {
  const tmpCallCallee = $;
  const tmpCalleeParam = f(1, b$1);
  const tmpReturnArg$1 = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg$1;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(1, 2);
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = g(2);
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(1, 2);
$(tmpCalleeParam$1);
const tmpCalleeParam = $(1, 2);
const tmpReturnArg$1 = $(tmpCalleeParam);
$(tmpReturnArg$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 2
 - 2: 1
 - 3: 1, 2
 - 4: 1
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
