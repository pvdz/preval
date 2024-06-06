# Preval test case

# return_partial.md

> One timers > Var > Return partial
>
> Functions that are called once should be inlined when possible

#TODO

## Input

`````js filename=intro
function f() {
  function g() {
    if ($(1)) {
      return $('a');
    } else {
      $('b');
    }
  }
  g();
  $('c');
}
const x = f();
$(x);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    if ($(1)) {
      return $(`a`);
    } else {
      $(`b`);
    }
  };
  g();
  $(`c`);
};
const x = f();
$(x);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpReturnArg = $(`a`);
      return tmpReturnArg;
    } else {
      $(`b`);
      return undefined;
    }
  };
  g();
  $(`c`);
  return undefined;
};
const x = f();
$(x);
`````

## Output


`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(`a`);
} else {
  $(`b`);
}
$(`c`);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( "a" );
}
else {
  $( "b" );
}
$( "c" );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'a'
 - 3: 'c'
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
