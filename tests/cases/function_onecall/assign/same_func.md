# Preval test case

# same_func.md

> Function onecall > Assign > Same func
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

function f() {
  function a() { $('a'); }
  a();
  function b() { $('b'); }
  b();
}

x = f(); // This x should not be SSA'd due to the closure
$(x);
$(closure());
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
    $('a');
  };
  let b = function () {
    debugger;
    $('b');
  };
  a();
  b();
};
let x = $(100);
$(closure());
x = f();
$(x);
$(closure());
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
    $('a');
    return undefined;
  };
  let b = function () {
    debugger;
    $('b');
    return undefined;
  };
  a();
  b();
  return undefined;
};
let x = $(100);
const tmpCallCallee = $;
const tmpCalleeParam = closure();
tmpCallCallee(tmpCalleeParam);
x = f();
$(x);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = closure();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const x = $(100);
$(x);
$('a');
$('b');
$(undefined);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 'a'
 - 4: 'b'
 - 5: undefined
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
