# Preval test case

# index_multi_scope.md

> Array > Static props > Index multi scope
>
> The immediate access should be resolved because we can guarantee the value

#TODO

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
  $('end');
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
  } else {
    return undefined;
  }
  $('end');
  return undefined;
};
const arr = [1, $, 3];
f();
f();
f();
f();
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  if ($) {
    $($);
    $('end');
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