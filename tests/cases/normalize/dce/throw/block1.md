# Preval test case

# block1.md

> Normalize > Dce > Throw > Block1
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  {
    throw $(7, 'throw');
  }
  $('fail');
}
$(f());
`````

## Settled


`````js filename=intro
const tmpThrowArg /*:unknown*/ = $(7, `throw`);
throw tmpThrowArg;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpThrowArg = $(7, `throw`);
throw tmpThrowArg;
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    throw $(7, `throw`);
  }
  $(`fail`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpThrowArg = $(7, `throw`);
  throw tmpThrowArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 7, "throw" );
throw a;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 7, 'throw'
 - eval returned: ('<crash[ 7 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
