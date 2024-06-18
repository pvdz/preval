# Preval test case

# else-vars.md

> Normalize > Return > Else-vars
>
> When both branches end with an update to the binding that is returned, return it immediately.

## Input

`````js filename=intro
function f() {
  let x = undefined;
  if ($(1)) {
    $(100);
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
    $(100);
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
    $(100);
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
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(100);
} else {
  const tmpClusterSSA_x = $(2, `b`);
  tmpCalleeParam = tmpClusterSSA_x;
}
$(tmpCalleeParam, `result`);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
if (b) {
  $( 100 );
}
else {
  const c = $( 2, "b" );
  a = c;
}
$( a, "result" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: undefined, 'result'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
