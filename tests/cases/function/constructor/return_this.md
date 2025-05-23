# Preval test case

# return_this.md

> Function > Constructor > Return this
>
> Special case return this

## Options

As long as the result is $(window), this test passes

- skipEval

## Input

`````js filename=intro
let glbl;
try {
  const tmpCallComplexCallee = Function(`return this`);
  const tmpReturnArg = tmpCallComplexCallee();
  glbl = tmpReturnArg;
} catch (e) {
  glbl = window;
}
$(glbl);
`````


## Settled


`````js filename=intro
$(window);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(window);
`````


## PST Settled
With rename=true

`````js filename=intro
$( window );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let glbl = undefined;
try {
  const tmpCallComplexCallee = function () {
    debugger;
    return window;
  };
  const tmpReturnArg = tmpCallComplexCallee();
  glbl = tmpReturnArg;
} catch (e) {
  glbl = window;
}
$(glbl);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
