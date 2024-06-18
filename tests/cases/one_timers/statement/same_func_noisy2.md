# Preval test case

# same_func_noisy2.md

> One timers > Statement > Same func noisy2
>
> What happens when the algo has to inline a call into the same func? Index staleness check.

## Input

`````js filename=intro
$(1);
function f() {
  $(3.1);
  $(3.2);
  $(3.3);
  function a() { 
    $('a1');
    $('a2');
  }
  $(4.1);
  $(4.2);
  $(4.3);
  a();
  $(5.1);
  $(5.2);
  $(5.3);
  function b() {
    $('b1');
    $('b2');
  }
  $(6.1);
  $(6.2);
  $(6.3);
  b();
  $(7.1);
  $(7.2);
  $(7.3);
}
$(2);
f();
$(8);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = function () {
    debugger;
    $(`a1`);
    $(`a2`);
  };
  let b = function () {
    debugger;
    $(`b1`);
    $(`b2`);
  };
  $(3.1);
  $(3.2);
  $(3.3);
  $(4.1);
  $(4.2);
  $(4.3);
  a();
  $(5.1);
  $(5.2);
  $(5.3);
  $(6.1);
  $(6.2);
  $(6.3);
  b();
  $(7.1);
  $(7.2);
  $(7.3);
};
$(1);
$(2);
f();
$(8);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = function () {
    debugger;
    $(`a1`);
    $(`a2`);
    return undefined;
  };
  let b = function () {
    debugger;
    $(`b1`);
    $(`b2`);
    return undefined;
  };
  $(3.1);
  $(3.2);
  $(3.3);
  $(4.1);
  $(4.2);
  $(4.3);
  a();
  $(5.1);
  $(5.2);
  $(5.3);
  $(6.1);
  $(6.2);
  $(6.3);
  b();
  $(7.1);
  $(7.2);
  $(7.3);
  return undefined;
};
$(1);
$(2);
f();
$(8);
`````

## Output


`````js filename=intro
$(1);
$(2);
$(3.1);
$(3.2);
$(3.3);
$(4.1);
$(4.2);
$(4.3);
$(`a1`);
$(`a2`);
$(5.1);
$(5.2);
$(5.3);
$(6.1);
$(6.2);
$(6.3);
$(`b1`);
$(`b2`);
$(7.1);
$(7.2);
$(7.3);
$(8);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( 3.1 );
$( 3.2 );
$( 3.3 );
$( 4.1 );
$( 4.2 );
$( 4.3 );
$( "a1" );
$( "a2" );
$( 5.1 );
$( 5.2 );
$( 5.3 );
$( 6.1 );
$( 6.2 );
$( 6.3 );
$( "b1" );
$( "b2" );
$( 7.1 );
$( 7.2 );
$( 7.3 );
$( 8 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3.1
 - 4: 3.2
 - 5: 3.3
 - 6: 4.1
 - 7: 4.2
 - 8: 4.3
 - 9: 'a1'
 - 10: 'a2'
 - 11: 5.1
 - 12: 5.2
 - 13: 5.3
 - 14: 6.1
 - 15: 6.2
 - 16: 6.3
 - 17: 'b1'
 - 18: 'b2'
 - 19: 7.1
 - 20: 7.2
 - 21: 7.3
 - 22: 8
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
