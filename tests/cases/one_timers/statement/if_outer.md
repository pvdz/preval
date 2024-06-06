# Preval test case

# if_outer.md

> One timers > Statement > If outer
>
> Functions that are called once should be inlined when possible

#TODO

## Input

`````js filename=intro
function f() {
  function g() {
    $('c');
  }
  if ($(1)) {
    $('a');
    g();
  } else {
    $('b');
  }
}
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    $(`c`);
  };
  if ($(1)) {
    $(`a`);
    g();
  } else {
    $(`b`);
  }
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    $(`c`);
    return undefined;
  };
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
f();
`````

## Output


`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(`a`);
  $(`c`);
} else {
  $(`b`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( "a" );
  $( "c" );
}
else {
  $( "b" );
}
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
