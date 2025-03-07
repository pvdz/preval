# Preval test case

# boolean_spied.md

> Array > Static context > Boolean spied
>
> Calling Boolean on arrays trigger spies

## Input

`````js filename=intro
const spy = {
  valueOf(){ $('x') }, 
  toString(){ $('y'); },
};
$(Boolean([spy, spy]));
`````

## Settled


`````js filename=intro
$(true);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````

## Pre Normal


`````js filename=intro
const spy = {
  valueOf() {
    debugger;
    $(`x`);
  },
  toString() {
    debugger;
    $(`y`);
  },
};
$(Boolean([spy, spy]));
`````

## Normalized


`````js filename=intro
const spy = {
  valueOf() {
    debugger;
    $(`x`);
    return undefined;
  },
  toString() {
    debugger;
    $(`y`);
    return undefined;
  },
};
const tmpCalleeParam$1 = [spy, spy];
const tmpCalleeParam = Boolean(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
