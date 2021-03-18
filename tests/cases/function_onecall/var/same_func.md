# Preval test case

# same_func.md

> Function onecall > Var > Same func
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
const x = f();
$(x);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let a = function () {
    $('a');
  };
  let b = function () {
    $('b');
  };
  a();
  b();
};
const x = f();
$(x);
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = function () {
    $('a');
  };
  let b = function () {
    $('b');
  };
  a();
  b();
};
const x = f();
$(x);
`````

## Output

`````js filename=intro
$('a');
$('b');
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
