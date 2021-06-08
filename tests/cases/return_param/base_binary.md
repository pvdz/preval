# Preval test case

# base_binary.md

> Return param > Base binary
>
> If a function returns a static mutation to a param value we can outline the param and drop it

#TODO

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = x | 5;
  return y;
}

$(f(1));
$(f(2));
$(f('three'));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $('no');
  $('inlining');
  $('please');
  const y = x | 5;
  return y;
};
$(f(1));
$(f(2));
$(f('three'));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $('no');
  $('inlining');
  $('please');
  const y = x | 5;
  return y;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(1);
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(2);
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f('three');
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  $('no');
  $('inlining');
  $('please');
  return undefined;
};
f();
$(5);
f();
$(7);
f();
$(5);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: 5
 - 5: 'no'
 - 6: 'inlining'
 - 7: 'please'
 - 8: 7
 - 9: 'no'
 - 10: 'inlining'
 - 11: 'please'
 - 12: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
