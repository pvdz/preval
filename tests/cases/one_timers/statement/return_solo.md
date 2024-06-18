# Preval test case

# return_solo.md

> One timers > Statement > Return solo
>
> Functions that are called once should be inlined when possible

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
  debugger;
  let g = function () {
    debugger;
    $(`a`);
    $(`b`);
    return $(`ab`);
  };
  g();
  $(`c`);
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    $(`a`);
    $(`b`);
    const tmpReturnArg = $(`ab`);
    return tmpReturnArg;
  };
  g();
  $(`c`);
  return undefined;
};
f();
`````

## Output


`````js filename=intro
$(`a`);
$(`b`);
$(`ab`);
$(`c`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "a" );
$( "b" );
$( "ab" );
$( "c" );
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
