# Preval test case

# partial_throw_if.md

> Common return > Partial throw if
>
> When a function throws the return value should still be assumed to be whatever is actually returned.

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    return 15;
  } else {
    throw 'Some error';
  }
}
f();
f();
f();
f();
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) {
    return 15;
  } else {
    throw `Some error`;
  }
};
f();
f();
f();
f();
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    return 15;
  } else {
    throw `Some error`;
  }
};
f();
f();
f();
f();
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const f /*:()=>*/ = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    return undefined;
  } else {
    throw `Some error`;
  }
};
f();
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
  const b = $( 1 );
  if (b) {
    return undefined;
  }
  else {
    throw "Some error";
  }
};
a();
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
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
