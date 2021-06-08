# Preval test case

# returned_and_called.md

> Return param > Returned and called
>
> Returning a static param mutation but also reading it so we can't just eliminate it

#TODO

## Input

`````js filename=intro
function f(g) {
  let y = g(1);
  $(y);
  return y;
}
$(f(function(a){ $(a, 'first'); }));
$(f(function(a){ $(a, 'second'); }));
$(f(function(a){ $(a, 'third'); }));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let g = $$0;
  debugger;
  let y = g(1);
  $(y);
  return y;
};
$(
  f(function ($$0) {
    let a = $$0;
    debugger;
    $(a, 'first');
  }),
);
$(
  f(function ($$0) {
    let a$1 = $$0;
    debugger;
    $(a$1, 'second');
  }),
);
$(
  f(function ($$0) {
    let a$3 = $$0;
    debugger;
    $(a$3, 'third');
  }),
);
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let g = $$0;
  debugger;
  let y = g(1);
  $(y);
  return y;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = function ($$0) {
  let a = $$0;
  debugger;
  $(a, 'first');
  return undefined;
};
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$3 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$5 = function ($$0) {
  let a$1 = $$0;
  debugger;
  $(a$1, 'second');
  return undefined;
};
const tmpCalleeParam$3 = tmpCallCallee$5(tmpCalleeParam$5);
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$7 = $;
const tmpCallCallee$9 = f;
const tmpCalleeParam$9 = function ($$0) {
  let a$3 = $$0;
  debugger;
  $(a$3, 'third');
  return undefined;
};
const tmpCalleeParam$7 = tmpCallCallee$9(tmpCalleeParam$9);
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const g = $$0;
  debugger;
  const y = g(1);
  $(y);
  return y;
};
const tmpCalleeParam$1 = function ($$0) {
  const a = $$0;
  debugger;
  $(a, 'first');
  return undefined;
};
const tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
const tmpCalleeParam$5 = function ($$0) {
  const a$1 = $$0;
  debugger;
  $(a$1, 'second');
  return undefined;
};
const tmpCalleeParam$3 = f(tmpCalleeParam$5);
$(tmpCalleeParam$3);
const tmpCalleeParam$9 = function ($$0) {
  const a$3 = $$0;
  debugger;
  $(a$3, 'third');
  return undefined;
};
const tmpCalleeParam$7 = f(tmpCalleeParam$9);
$(tmpCalleeParam$7);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'first'
 - 2: undefined
 - 3: undefined
 - 4: 1, 'second'
 - 5: undefined
 - 6: undefined
 - 7: 1, 'third'
 - 8: undefined
 - 9: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
