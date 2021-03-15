# Preval test case

# if_outer.md

> Function onecall > If outer
>
> Functions that are called once should be inlined when possible

#TODO

## Input

`````js filename=intro
function f() {
  function g() {
    $('c');
  }
  if ($(1)) {
    $('a');
    g();
  } else {
    $('b');
  }
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let g = function () {
    $('c');
  };
  if ($(1)) {
    $('a');
    g();
  } else {
    $('b');
  }
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  let g = function () {
    $('c');
  };
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $('a');
    g();
  } else {
    $('b');
  }
};
f();
`````

## Output

`````js filename=intro
const f = function () {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $('a');
    $('c');
  } else {
    $('b');
  }
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
