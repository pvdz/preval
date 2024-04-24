# Preval test case

# if_return2.md

> One timers > Assign > If return2
>
> Return inlining

#TODO

## Input

`````js filename=intro
const closure = function () {
  return $(x, 'closure');
};
const f = function () {
  if ($) {
    $(1, 'f');
  }
};
let x = $(100, 'init');
closure();
x = f();
$(x, 'x');
closure();
`````

## Pre Normal

`````js filename=intro
const closure = function () {
  debugger;
  return $(x, `closure`);
};
const f = function () {
  debugger;
  if ($) {
    $(1, `f`);
  }
};
let x = $(100, `init`);
closure();
x = f();
$(x, `x`);
closure();
`````

## Normalized

`````js filename=intro
const closure = function () {
  debugger;
  const tmpReturnArg = $(x, `closure`);
  return tmpReturnArg;
};
const f = function () {
  debugger;
  if ($) {
    $(1, `f`);
    return undefined;
  } else {
    return undefined;
  }
};
let x = $(100, `init`);
closure();
x = f();
$(x, `x`);
closure();
`````

## Output

`````js filename=intro
let x = $(100, `init`);
$(x, `closure`);
if ($) {
  $(1, `f`);
  x = undefined;
  $(undefined, `x`);
} else {
  x = undefined;
  $(undefined, `x`);
}
$(x, `closure`);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 100, "init" );
$( a, "closure" );
if ($) {
  $( 1, "f" );
  a = undefined;
  $( undefined, "x" );
}
else {
  a = undefined;
  $( undefined, "x" );
}
$( a, "closure" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100, 'init'
 - 2: 100, 'closure'
 - 3: 1, 'f'
 - 4: undefined, 'x'
 - 5: undefined, 'closure'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
