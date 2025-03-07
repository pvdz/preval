# Preval test case

# block2.md

> Normalize > Dce > Return > Block2
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  {
    return $(1, 'return');
    $('fail');
  }
  $('fail');
}
$(f());
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1, `return`);
$(tmpCalleeParam);
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
  {
    return $(1, `return`);
    $(`fail`);
  }
  $(`fail`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpReturnArg = $(1, `return`);
  return tmpReturnArg;
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
