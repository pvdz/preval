# Preval test case

# reverse.md

> Locking > Reverse
>
> A func that is being cleared after being called once is "locked". I guess.

In this case the function gets called before it is tested ...

#TODO

## Input

`````js filename=intro
function f() {
  $('call me once');
}
function g() {
  let x = f;
  f();
  if (f) {
    f = false;
  }
}
$(g());
$(g());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  $(`call me once`);
};
let g = function () {
  debugger;
  let x = f;
  f();
  if (f) {
    f = false;
  }
};
$(g());
$(g());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $(`call me once`);
  return undefined;
};
let g = function () {
  debugger;
  let x = f;
  f();
  if (f) {
    f = false;
    return undefined;
  } else {
    return undefined;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = g();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = g();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
let f = true;
const g = function () {
  debugger;
  $(`call me once`);
  if (f) {
    f = false;
    return undefined;
  } else {
    return undefined;
  }
};
g();
$(undefined);
g();
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
const b = function() {
  debugger;
  $( "call me once" );
  if (a) {
    a = false;
    return undefined;
  }
  else {
    return undefined;
  }
},;
b();
$( undefined );
b();
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'call me once'
 - 2: undefined
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: BAD!!
 - 1: 'call me once'
 - 2: undefined
 - 3: 'call me once'
 - 4: undefined
 - eval returned: undefined
