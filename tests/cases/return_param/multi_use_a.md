# Preval test case

# multi_use_a.md

> Return param > Multi use a
>
> If a function returns a static mutation to a param value we can outline the param and drop it

Make sure it works when the same ident is returned multiple times.

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = ~x;
  if ($(true)) {
    $('a');
    return y;
  } else {
    $('b');
    return y;
  }
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
  const y = ~x;
  if ($(true)) {
    $('a');
    return y;
  } else {
    $('b');
    return y;
  }
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
  const y = ~x;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $('a');
    return y;
  } else {
    $('b');
    return y;
  }
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
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $('a');
    return undefined;
  } else {
    $('b');
    return undefined;
  }
};
f();
$(-2);
f();
$(-3);
f();
const tmpCalleeParam$3 = ~'three';
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: true
 - 5: 'a'
 - 6: -2
 - 7: 'no'
 - 8: 'inlining'
 - 9: 'please'
 - 10: true
 - 11: 'a'
 - 12: -3
 - 13: 'no'
 - 14: 'inlining'
 - 15: 'please'
 - 16: true
 - 17: 'a'
 - 18: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
