# Preval test case

# dowhile2.md

> Normalize > Dce > Return > Dowhile2
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  do {
    return $(1, 'return');
    $('fail');
  } while ($(true));
  $('keep, do not eval');
}
$(f());
`````

## Settled


`````js filename=intro
const tmpReturnArg /*:unknown*/ = $(1, `return`);
$(tmpReturnArg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1, `return`));
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    {
      return $(1, `return`);
      $(`fail`);
    }
    if ($(true)) {
    } else {
      break;
    }
  }
  $(`keep, do not eval`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    const tmpReturnArg = $(1, `return`);
    return tmpReturnArg;
  }
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1, "return" );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1, 'return'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
