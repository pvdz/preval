# Preval test case

# returned_and_used.md

> Return param > Returned and used
>
> Returning a static param mutation but also reading it so we can't just eliminate it

#TODO

## Input

`````js filename=intro
function f(x) {
  let y = x + 1;
  $(y);
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
  let y = x + 1;
  $(y);
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
  let y = x + 1;
  $(y);
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
  const y = x + 1;
  $(y);
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
 - 1: 2
 - 2: 2
 - 3: 3
 - 4: 3
 - 5: 'three1'
 - 6: 'three1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
