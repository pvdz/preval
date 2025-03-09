# Preval test case

# if_both.md

> One timers > Assign > If both
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
  if ($(1)) {
    $('c');
    g();
  } else {
    $('d');
  }
}

x = f(); // This x should not be SSA'd due to the closure
$(x);
$(closure());
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(100);
$(x);
const g /*:()=>undefined*/ = function () {
  debugger;
  const tmpIfTest /*:unknown*/ = $(1);
  if (tmpIfTest) {
    $(`a`);
    g();
    return undefined;
  } else {
    $(`b`);
    return undefined;
  }
};
const tmpIfTest$1 /*:unknown*/ = $(1);
if (tmpIfTest$1) {
  $(`c`);
  g();
  $(undefined);
  $(undefined);
} else {
  $(`d`);
  $(undefined);
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
const g = function () {
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
  $(undefined);
  $(undefined);
} else {
  $(`d`);
  $(undefined);
  $(undefined);
}
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
  if ($(1)) {
    $(`c`);
    g();
  } else {
    $(`d`);
  }
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
let x = $(100);
const tmpCalleeParam = closure();
$(tmpCalleeParam);
x = f();
$(x);
const tmpCalleeParam$1 = closure();
$(tmpCalleeParam$1);
`````

## PST Settled
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
const d = $( 1 );
if (d) {
  $( "c" );
  b();
  $( undefined );
  $( undefined );
}
else {
  $( "d" );
  $( undefined );
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 1
 - 4: 'c'
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

Post settled calls: Same

Denormalized calls: Same
