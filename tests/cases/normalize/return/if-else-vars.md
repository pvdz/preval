# Preval test case

# if-else-vars.md

> Normalize > Return > If-else-vars
>
> When both branches end with an update to the binding that is returned, return it immediately.

#TODO

## Input

`````js filename=intro
function f() {
  let x = undefined;
  if ($(1)) {
    x = $(1, 'a');
  } else {
    x = $(2, 'b');
  }
  return x;
}
$(f(), 'result');
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  if ($(1)) {
    x = $(1, `a`);
  } else {
    x = $(2, `b`);
  }
  return x;
};
$(f(), `result`);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    x = $(1, `a`);
    return x;
  } else {
    x = $(2, `b`);
    return x;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = `result`;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  let x = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    x = $(1, `a`);
    return x;
  } else {
    x = $(2, `b`);
    return x;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam, `result`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  let b = undefined;
  const c = $( 1 );
  if (c) {
    b = $( 1, "a" );
    return b;
  }
  else {
    b = $( 2, "b" );
    return b;
  }
};
const d = a();
$( d, "result" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 'a'
 - 3: 1, 'result'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
