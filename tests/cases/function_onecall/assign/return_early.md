# Preval test case

# return_early.md

> Function onecall > Assign > Return early
>
> Functions that are called once should be inlined when possible

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
  function g() {
    if ($(1)) {
      return $('a');
    }
    $('b');
  }
  g();
  $('c');
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
  let g = function () {
    debugger;
    if ($(1)) {
      return $('a');
    }
    $('b');
  };
  g();
  $('c');
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
  let g = function () {
    debugger;
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpReturnArg = $('a');
      return tmpReturnArg;
    } else {
    }
    $('b');
    return undefined;
  };
  g();
  $('c');
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
const tmpIfTest = $(1);
if (tmpIfTest) {
  $('a');
} else {
  $('b');
}
$('c');
$(undefined);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 1
 - 4: 'a'
 - 5: 'c'
 - 6: undefined
 - 7: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
