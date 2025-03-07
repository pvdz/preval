# Preval test case

# dowhile1.md

> Normalize > Dce > Throw > Dowhile1
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  do {
    throw $(1, 'return');
  } while ($(true));
  $('keep, do not eval');
}
$(f());
`````

## Settled


`````js filename=intro
const tmpThrowArg /*:unknown*/ = $(1, `return`);
throw tmpThrowArg;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpThrowArg = $(1, `return`);
throw tmpThrowArg;
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    {
      throw $(1, `return`);
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
    const tmpThrowArg = $(1, `return`);
    throw tmpThrowArg;
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
throw a;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1, 'return'
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
