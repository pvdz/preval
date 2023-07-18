# Preval test case

# uninlinable_prim_return.md

> Return > Uninlinable prim return
>
> A function call where it always returns a primitive does not need to trampoline the return value.

#TODO

## Input

`````js filename=intro
function f() {
  $('abc');
  if ($(1)) {
    $('def');
  }
  return 15;
}
function g() {
  if ($(1)) {
    return f();
  } else {
    const x = f();
    $(x, 'foooopsie');
  }
}
g();
g();
g();
g();
$(g());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  $(`abc`);
  if ($(1)) {
    $(`def`);
  }
  return 15;
};
let g = function () {
  debugger;
  if ($(1)) {
    return f();
  } else {
    const x = f();
    $(x, `foooopsie`);
  }
};
g();
g();
g();
g();
$(g());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $(`abc`);
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(`def`);
    return 15;
  } else {
    return 15;
  }
};
let g = function () {
  debugger;
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    const tmpReturnArg = f();
    return tmpReturnArg;
  } else {
    const x = f();
    $(x, `foooopsie`);
    return undefined;
  }
};
g();
g();
g();
g();
const tmpCallCallee = $;
const tmpCalleeParam = g();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const g = function () {
  debugger;
  const tmpIfTest$1 = $(1);
  $(`abc`);
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(`def`);
  } else {
  }
  if (tmpIfTest$1) {
    return 15;
  } else {
    $(15, `foooopsie`);
    return undefined;
  }
};
g();
g();
g();
g();
const tmpCalleeParam = g();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  $( "abc" );
  const c = $( 1 );
  if (c) {
    $( "def" );
  }
  if (b) {
    return 15;
  }
  else {
    $( 15, "foooopsie" );
    return undefined;
  }
},;
a();
a();
a();
a();
const d = a();
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'abc'
 - 3: 1
 - 4: 'def'
 - 5: 1
 - 6: 'abc'
 - 7: 1
 - 8: 'def'
 - 9: 1
 - 10: 'abc'
 - 11: 1
 - 12: 'def'
 - 13: 1
 - 14: 'abc'
 - 15: 1
 - 16: 'def'
 - 17: 1
 - 18: 'abc'
 - 19: 1
 - 20: 'def'
 - 21: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
