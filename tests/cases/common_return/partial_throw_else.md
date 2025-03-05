# Preval test case

# partial_throw_else.md

> Common return > Partial throw else
>
> When a function throws the return value should still be assumed to be whatever is actually returned.

## Input

`````js filename=intro
function f() {
  if ($(0)) {
    throw 'Some error';
  } else {
    return 15;
  }
}
f();
f();
f();
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($(0)) {
    throw `Some error`;
  } else {
    return 15;
  }
};
f();
f();
f();
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(0);
  if (tmpIfTest) {
    throw `Some error`;
  } else {
    return 15;
  }
};
f();
f();
f();
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const tmpIfTest /*:unknown*/ = $(0);
  if (tmpIfTest) {
    throw `Some error`;
  } else {
    return undefined;
  }
};
f();
f();
f();
f();
$(15);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 0 );
  if (b) {
    throw "Some error";
  }
  else {
    return undefined;
  }
};
a();
a();
a();
a();
$( 15 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 0
 - 4: 0
 - 5: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
