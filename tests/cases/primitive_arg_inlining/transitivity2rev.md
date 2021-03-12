# Preval test case

# transitivity2rev.md

> Primitive arg inlining > Transitivity2rev
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
$(g(2)); 
$(f(1, 2)); // Should ultimately reuse the cloned func from the prev call
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
const tmpCalleeParam$1 = g(2);
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f(1, 2);
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const g = function (b$1) {
  const tmpCalleeParam = $(1, b$1);
  const tmpReturnArg$1 = $(tmpCalleeParam);
  return tmpReturnArg$1;
};
const tmpCalleeParam$1 = g(2);
$(tmpCalleeParam$1);
const tmpCalleeParam$2 = $(1, 2);
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 2
 - 2: 1
 - 3: 1
 - 4: 1, 2
 - 5: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
