# Preval test case

# locking_reverse.md

> Function locks > Locking reverse
>
> A func that is being cleared after being called once is "locked". I guess.

- In this case the function gets tested before it is called ...

#TODO

## Input

`````js filename=intro
let f = function() {
  $(`call me once`);
};
const g = function() {
  if (f) {
    f();
    f = false;
  } else {
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
const g = function () {
  debugger;
  if (f) {
    f();
    f = false;
  } else {
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
const g = function () {
  debugger;
  if (f) {
    f();
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
  if (f) {
    $(`call me once`);
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
  if (a) {
    $( "call me once" );
    a = false;
    return undefined;
  }
  else {
    return undefined;
  }
};
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
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
