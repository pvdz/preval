# Preval test case

# implicit_window.md

> This > Implicit window
>
> A function that gets called with implicit `this` returns `undefined` in module code

## Options

- implicitThis=window
- skipEval=true

## Input

`````js filename=intro
function f() {
  return this;
}
$(f());
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


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
