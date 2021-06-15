# Preval test case

# regression3.md

> Common return > Regression3
>
> This was working at some point and this was broken another point and hopefully when you're reading it it's working again

Note: `d` should be eliminated and inlined into the only call site, `c`

#TODO

## Input

`````js filename=intro
const d = function (x) {
  if ($) {
    $('d');
    return x;
  } else {
    return x;
  }
};
const c = function () {
  $('c');
  $(d($(10)), d($(20)));
};
c();
c();
`````

## Pre Normal

`````js filename=intro
const d = function ($$0) {
  let x = $$0;
  debugger;
  if ($) {
    $(`d`);
    return x;
  } else {
    return x;
  }
};
const c = function () {
  debugger;
  $(`c`);
  $(d($(10)), d($(20)));
};
c();
c();
`````

## Normalized

`````js filename=intro
const d = function ($$0) {
  let x = $$0;
  debugger;
  if ($) {
    $(`d`);
    return x;
  } else {
    return x;
  }
};
const c = function () {
  debugger;
  $(`c`);
  const tmpCallCallee = $;
  const tmpCallCallee$1 = d;
  const tmpCalleeParam$3 = $(10);
  const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$3);
  const tmpCallCallee$3 = d;
  const tmpCalleeParam$5 = $(20);
  const tmpCalleeParam$1 = tmpCallCallee$3(tmpCalleeParam$5);
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  return undefined;
};
c();
c();
`````

## Output

`````js filename=intro
const d = function () {
  debugger;
  if ($) {
    $(`d`);
    return undefined;
  } else {
    return undefined;
  }
};
const c = function () {
  debugger;
  $(`c`);
  const tmpCalleeParam$3 = $(10);
  d();
  const tmpCalleeParam$5 = $(20);
  d();
  $(tmpCalleeParam$3, tmpCalleeParam$5);
  return undefined;
};
c();
c();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: 10
 - 3: 'd'
 - 4: 20
 - 5: 'd'
 - 6: 10, 20
 - 7: 'c'
 - 8: 10
 - 9: 'd'
 - 10: 20
 - 11: 'd'
 - 12: 10, 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
