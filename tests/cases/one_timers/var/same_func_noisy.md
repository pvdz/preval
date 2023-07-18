# Preval test case

# same_func_noisy.md

> One timers > Var > Same func noisy
>
> What happens when the algo has to inline a call into the same func? Index staleness check.

#TODO

## Input

`````js filename=intro
$(1);
function f() {
  $(3);
  function a() { $('a'); }
  $(4);
  a();
  $(5);
  function b() { $('b'); }
  $(6);
  b();
  $(7);
}
$(2);
const x = f();
$(x);
$(8);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = function () {
    debugger;
    $(`a`);
  };
  let b = function () {
    debugger;
    $(`b`);
  };
  $(3);
  $(4);
  a();
  $(5);
  $(6);
  b();
  $(7);
};
$(1);
$(2);
const x = f();
$(x);
$(8);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let a = function () {
    debugger;
    $(`a`);
    return undefined;
  };
  let b = function () {
    debugger;
    $(`b`);
    return undefined;
  };
  $(3);
  $(4);
  a();
  $(5);
  $(6);
  b();
  $(7);
  return undefined;
};
$(1);
$(2);
const x = f();
$(x);
$(8);
`````

## Output

`````js filename=intro
$(1);
$(2);
$(3);
$(4);
$(`a`);
$(5);
$(6);
$(`b`);
$(7);
$(undefined);
$(8);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( 3 );
$( 4 );
$( "a" );
$( 5 );
$( 6 );
$( "b" );
$( 7 );
$( undefined );
$( 8 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 'a'
 - 6: 5
 - 7: 6
 - 8: 'b'
 - 9: 7
 - 10: undefined
 - 11: 8
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
