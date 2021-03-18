# Preval test case

# return_solo.md

> Function onecall > Return solo
>
> Functions that are called once should be inlined when possible

#TODO

## Input

`````js filename=intro
function f() {
  function g() {
    $('a');
    $('b');
    return $('ab');
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
    $('a');
    $('b');
    return $('ab');
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
    $('a');
    $('b');
    const tmpReturnArg = $('ab');
    return tmpReturnArg;
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
    $('a');
    $('b');
    const tmpReturnArg = $('ab');
    return tmpReturnArg;
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
 - 1: 'a'
 - 2: 'b'
 - 3: 'ab'
 - 4: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same