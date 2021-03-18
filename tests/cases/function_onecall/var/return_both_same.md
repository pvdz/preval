# Preval test case

# return_both_same.md

> Function onecall > Var > Return both same
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
const x = f();
$(x);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let g = function () {
    if ($(1)) {
      return 'xyz';
    } else {
      return 'xyz';
    }
  };
  $(g());
  $('c');
};
const x = f();
$(x);
`````

## Normalized

`````js filename=intro
let f = function () {
  let g = function () {
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
const x = f();
$(x);
`````

## Output

`````js filename=intro
const g = function () {
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
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'xyz'
 - 3: 'c'
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
