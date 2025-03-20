# Preval test case

# return_this.md

> Function > Constructor > Return this
>
> Special case return this

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


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ Maximum call stack size exceeded ]>')

Pre normalization calls: Same

Normalized calls: BAD!?
 - eval returned: ('<crash[ <ref> is not defined ]>')

Post settled calls: BAD!!
 - eval returned: ('<crash[ <ref> is not defined ]>')

Denormalized calls: BAD!!
 - eval returned: ('<crash[ <ref> is not defined ]>')
