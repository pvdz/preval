# Preval test case

# return_new_func.md

> Function inlining > Return new func
>
> We should be able to inline certain functions

#TODO

## Input

`````js filename=intro
function g(a) {
  return $(a, 'g');
}
function f() {
  return new g(10);
}
$(f(), 'outer');
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpReturnArg = new g(10);
  return tmpReturnArg;
};
let g = function (a) {
  const tmpReturnArg$1 = $(a, 'g');
  return tmpReturnArg$1;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = 'outer';
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpReturnArg = new g(10);
  return tmpReturnArg;
};
const g = function (a) {
  const tmpReturnArg$1 = $(a, 'g');
  return tmpReturnArg$1;
};
const tmpCalleeParam = f();
$(tmpCalleeParam, 'outer');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10, 'g'
 - 2: {}, 'outer'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same