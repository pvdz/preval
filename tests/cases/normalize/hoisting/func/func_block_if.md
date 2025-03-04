# Preval test case

# func_block_if.md

> Normalize > Hoisting > Func > Func block if
>
> Block hoisting func decls

## Input

`````js filename=intro
function g() {
  if ($(1)) {
    f(); // Should be ok
    function f(){ $(1); }
  }
}
g();
`````

## Pre Normal


`````js filename=intro
let g = function () {
  debugger;
  if ($(1)) {
    let f = function () {
      debugger;
      $(1);
    };
    f();
  }
};
g();
`````

## Normalized


`````js filename=intro
let g = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    let f = function () {
      debugger;
      $(1);
      return undefined;
    };
    f();
    return undefined;
  } else {
    return undefined;
  }
};
g();
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(1);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 1 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
