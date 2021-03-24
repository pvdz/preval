# Preval test case

# return_both_same.md

> Function onecall > Assign > Return both same
>
> Functions that are called once should be inlined when possible

#TODO

## Input

`````js filename=intro
let x = $(100);
function closure() {
  // This serves to keep x from being eliminated/SSA'd
  return x;
}
$(closure());

function f() {
  function g() {
    if ($(1)) {
      return 'xyz';
    } else {
      return 'xyz';
    }
  }
  $(g());
  $('c');
}

x = f(); // This x should not be SSA'd due to the closure
$(x);
$(closure());
`````

## Pre Normal

`````js filename=intro
let closure = function () {
  debugger;
  return x;
};
let f = function () {
  debugger;
  let g = function () {
    debugger;
    if ($(1)) {
      return 'xyz';
    } else {
      return 'xyz';
    }
  };
  $(g());
  $('c');
};
let x = $(100);
$(closure());
x = f();
$(x);
$(closure());
`````

## Normalized

`````js filename=intro
let closure = function () {
  debugger;
  return x;
};
let f = function () {
  debugger;
  let g = function () {
    debugger;
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      return 'xyz';
    } else {
      return 'xyz';
    }
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = g();
  tmpCallCallee(tmpCalleeParam);
  $('c');
};
let x = $(100);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = closure();
tmpCallCallee$1(tmpCalleeParam$1);
x = f();
$(x);
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = closure();
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const x = $(100);
$(x);
const g = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    return 'xyz';
  } else {
    return 'xyz';
  }
};
const tmpCalleeParam = g();
$(tmpCalleeParam);
$('c');
$(undefined);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 1
 - 4: 'xyz'
 - 5: 'c'
 - 6: undefined
 - 7: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same