# Preval test case

# return_both.md

> One timers > Statement > Return both
>
> Functions that are called once should be inlined when possible

## Input

`````js filename=intro
function f() {
  function g() {
    if ($(1)) {
      return $('a');
    } else {
      return $('b');
    }
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
    if ($(1)) {
      return $(`a`);
    } else {
      return $(`b`);
    }
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
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpReturnArg = $(`a`);
      return tmpReturnArg;
    } else {
      const tmpReturnArg$1 = $(`b`);
      return tmpReturnArg$1;
    }
  };
  g();
  $(`c`);
  return undefined;
};
f();
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
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'a'
 - 3: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
