# Preval test case

# same_func_noisy.md

> One timers > Assign > Same func noisy
>
> What happens when the algo has to inline a call into the same func? Index staleness check.

#TODO

## Input

`````js filename=intro
let x = $(100);
function closure() {
  // This serves to keep x from being eliminated/SSA'd
  return x;
}
$(closure());
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
x = f(); // This x should not be SSA'd due to the closure
$(x);
$(closure());
$(8);
`````

## Pre Normal

`````js filename=intro
let closure = function () {
  debugger;
  return x;
};
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
let x = $(100);
$(closure());
$(1);
$(2);
x = f();
$(x);
$(closure());
$(8);
`````

## Normalized

`````js filename=intro
let closure = function () {
  debugger;
  return x;
};
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
let x = $(100);
const tmpCallCallee = $;
const tmpCalleeParam = closure();
tmpCallCallee(tmpCalleeParam);
$(1);
$(2);
x = f();
$(x);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = closure();
tmpCallCallee$1(tmpCalleeParam$1);
$(8);
`````

## Output

`````js filename=intro
const x = $(100);
$(x);
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
$(undefined);
$(8);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 1
 - 4: 2
 - 5: 3
 - 6: 4
 - 7: 'a'
 - 8: 5
 - 9: 6
 - 10: 'b'
 - 11: 7
 - 12: undefined
 - 13: undefined
 - 14: 8
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
