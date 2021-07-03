# Preval test case

# return_param_method.md

> Return > Return param method
>
> A function that returns an alteration of its param

#TODO

## Input

`````js filename=intro
function f(a) {
  $('stop');
  $('the');
  $('inlining');
  return a.toString(2); // A lot trickier, at least in certain cases
}
$(f(1));
$(f(2));
$(f('three'));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  $(`stop`);
  $(`the`);
  $(`inlining`);
  return a.toString(2);
};
$(f(1));
$(f(2));
$(f(`three`));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  $(`stop`);
  $(`the`);
  $(`inlining`);
  const tmpReturnArg = a.toString(2);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(1);
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(2);
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f(`three`);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  $(`stop`);
  $(`the`);
  $(`inlining`);
  return undefined;
};
f();
$(`1`);
f();
$(`10`);
f();
$(`three`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'stop'
 - 2: 'the'
 - 3: 'inlining'
 - 4: '1'
 - 5: 'stop'
 - 6: 'the'
 - 7: 'inlining'
 - 8: '10'
 - 9: 'stop'
 - 10: 'the'
 - 11: 'inlining'
 - 12: 'three'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
