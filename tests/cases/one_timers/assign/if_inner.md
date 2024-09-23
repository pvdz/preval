# Preval test case

# if_inner.md

> One timers > Assign > If inner
>
> Functions that are called once should be inlined when possible

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
      $('a');
      g();
    } else {
      $('b');
    }
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
      $(`a`);
      g();
    } else {
      $(`b`);
    }
  };
  g();
  $(`c`);
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
      $(`a`);
      g();
      return undefined;
    } else {
      $(`b`);
      return undefined;
    }
  };
  g();
  $(`c`);
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
const g /*:()=>undefined*/ = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(`a`);
    g();
    return undefined;
  } else {
    $(`b`);
    return undefined;
  }
};
g();
$(`c`);
$(undefined);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
const b = function() {
  debugger;
  const c = $( 1 );
  if (c) {
    $( "a" );
    b();
    return undefined;
  }
  else {
    $( "b" );
    return undefined;
  }
};
b();
$( "c" );
$( undefined );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 1
 - 4: 'a'
 - 5: 1
 - 6: 'a'
 - 7: 1
 - 8: 'a'
 - 9: 1
 - 10: 'a'
 - 11: 1
 - 12: 'a'
 - 13: 1
 - 14: 'a'
 - 15: 1
 - 16: 'a'
 - 17: 1
 - 18: 'a'
 - 19: 1
 - 20: 'a'
 - 21: 1
 - 22: 'a'
 - 23: 1
 - 24: 'a'
 - 25: 1
 - 26: 'a'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
