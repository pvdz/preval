# Preval test case

# if_both.md

> One timers > Var > If both
>
> Functions that are called once should be inlined when possible

## Input

`````js filename=intro
function f() {
  function g() {
    if ($(1)) {
      $('a');
      g();
    } else {
      $('b');
    }
  }
  if ($(1)) {
    $('c');
    g();
  } else {
    $('d');
  }
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
      $(`a`);
      g();
    } else {
      $(`b`);
    }
  };
  if ($(1)) {
    $(`c`);
    g();
  } else {
    $(`d`);
  }
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
      $(`a`);
      g();
      return undefined;
    } else {
      $(`b`);
      return undefined;
    }
  };
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    $(`c`);
    g();
    return undefined;
  } else {
    $(`d`);
    return undefined;
  }
};
const x = f();
$(x);
`````

## Output


`````js filename=intro
const g /*:()=>*/ = function () {
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
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  $(`c`);
  g();
} else {
  $(`d`);
}
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  if (b) {
    $( "a" );
    a();
    return undefined;
  }
  else {
    $( "b" );
    return undefined;
  }
};
const c = $( 1 );
if (c) {
  $( "c" );
  a();
}
else {
  $( "d" );
}
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'c'
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
