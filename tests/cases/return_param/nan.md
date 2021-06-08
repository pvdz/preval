# Preval test case

# nan.md

> Return param > Nan
>
> If a function returns a static mutation to a param value we can outline the param and drop it

Returns a builtin

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = ~x;
  if ($(true)) {
    $('a');
    return NaN;
  } else {
    $('b');
    return NaN;
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
    return NaN;
  } else {
    $('b');
    return NaN;
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
    return NaN;
  } else {
    $('b');
    return NaN;
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
const f = function ($$0) {
  const x = $$0;
  debugger;
  $('no');
  $('inlining');
  $('please');
  ~x;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $('a');
    return undefined;
  } else {
    $('b');
    return undefined;
  }
};
f(1);
$(NaN);
f(2);
$(NaN);
f('three');
$(NaN);
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
 - 6: NaN
 - 7: 'no'
 - 8: 'inlining'
 - 9: 'please'
 - 10: true
 - 11: 'a'
 - 12: NaN
 - 13: 'no'
 - 14: 'inlining'
 - 15: 'please'
 - 16: true
 - 17: 'a'
 - 18: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
