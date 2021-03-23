# Preval test case

# same_func.md

> Function onecall > Statement > Same func
>
> What happens when the algo has to inline a call into the same func? Index staleness check.

#TODO

## Input

`````js filename=intro
function f() {
  function a() { $('a'); }
  a();
  function b() { $('b'); }
  b();
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = function () {
    debugger;
    $('a');
  };
  let b = function () {
    debugger;
    $('b');
  };
  a();
  b();
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let a = function () {
    debugger;
    $('a');
  };
  let b = function () {
    debugger;
    $('b');
  };
  a();
  b();
};
f();
`````

## Output

`````js filename=intro
$('a');
$('b');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
