# Preval test case

# index_multi_scope.md

> Array > Static props > Index multi scope
>
> The immediate access should be resolved because we can guarantee the value

## Input

`````js filename=intro
const arr = [1, $, 3];
function f() {
  if ($) {
    $(arr[1]);
  } else {
    return ;  
  }

  $('end')
}
f();
// Prevent inlining
f();
f();
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    $(arr[1]);
  } else {
    return;
  }
  $(`end`);
};
const arr = [1, $, 3];
f();
f();
f();
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    const tmpCallCallee = $;
    const tmpCalleeParam = arr[1];
    tmpCallCallee(tmpCalleeParam);
    $(`end`);
    return undefined;
  } else {
    return undefined;
  }
};
const arr = [1, $, 3];
f();
f();
f();
f();
`````

## Output


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  if ($) {
    $($);
    $(`end`);
    return undefined;
  } else {
    return undefined;
  }
};
f();
f();
f();
f();
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  if ($) {
    $( $ );
    $( "end" );
    return undefined;
  }
  else {
    return undefined;
  }
};
a();
a();
a();
a();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 'end'
 - 3: '<$>'
 - 4: 'end'
 - 5: '<$>'
 - 6: 'end'
 - 7: '<$>'
 - 8: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
