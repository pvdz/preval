# Preval test case

# length_multi_scope.md

> Array > Static props > Length multi scope
>
> The immediate access should be resolved because we can guarantee the value

## Input

`````js filename=intro
const arr = [1, $, 3];
function f() {
  if ($) {
    $(arr.length);
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

## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  if ($) {
    $(3);
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

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  if ($) {
    $(3);
    $(`end`);
  }
};
f();
f();
f();
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    $(arr.length);
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
    const tmpCalleeParam = arr.length;
    $(tmpCalleeParam);
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

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  if ($) {
    $( 3 );
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

## Runtime Outcome

Should call `$` with:
 - 1: 3
 - 2: 'end'
 - 3: 3
 - 4: 'end'
 - 5: 3
 - 6: 'end'
 - 7: 3
 - 8: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
