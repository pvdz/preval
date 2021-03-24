# Preval test case

# return_both_same.md

> Function onecall > Statement > Return both same
>
> Functions that are called once should be inlined when possible

#TODO

## Input

`````js filename=intro
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
f();
`````

## Pre Normal

`````js filename=intro
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
f();
`````

## Normalized

`````js filename=intro
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
f();
`````

## Output

`````js filename=intro
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
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'xyz'
 - 3: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same