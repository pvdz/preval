# Preval test case

# binary_bad_right.md

> Return param > Binary bad right
>
> If a function returns a static mutation to a param value we can outline the param and drop it

#TODO

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  const bad = $('please');
  
  const y = x | bad; // The ident blocks the trick
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
  const bad = $('please');
  const y = x | bad;
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
  const bad = $('please');
  const y = x | bad;
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
const f = function ($$0) {
  const x = $$0;
  debugger;
  $('no');
  $('inlining');
  const bad = $('please');
  const y = x | bad;
  return y;
};
const tmpCalleeParam = f(1);
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(2);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f('three');
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: 1
 - 5: 'no'
 - 6: 'inlining'
 - 7: 'please'
 - 8: 2
 - 9: 'no'
 - 10: 'inlining'
 - 11: 'please'
 - 12: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
