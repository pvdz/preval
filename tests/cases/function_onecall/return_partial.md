# Preval test case

# return_partial.md

> Function onecall > Return partial
>
> Functions that are called once should be inlined when possible

#TODO

## Input

`````js filename=intro
function f() {
  function g() {
    if ($(1)) {
      return $('a');
    } else {
      $('b');
    }
  }
  g();
  $('c');
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let g = function () {
    if ($(1)) {
      return $('a');
    } else {
      $('b');
    }
  };
  g();
  $('c');
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  let g = function () {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpReturnArg = $('a');
      return tmpReturnArg;
    } else {
      $('b');
    }
  };
  g();
  $('c');
};
f();
`````

## Output

`````js filename=intro
const f = function () {
  const g = function () {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpReturnArg = $('a');
      return tmpReturnArg;
    } else {
      $('b');
    }
  };
  g();
  $('c');
};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'a'
 - 3: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
