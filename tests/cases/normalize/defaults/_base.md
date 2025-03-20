# Preval test case

# _base.md

> Normalize > Defaults > Base
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = "foo") { 
  return a; 
}

$(f('x'));
$(f('y'));
`````


## Settled


`````js filename=intro
$(`x`);
$(`y`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`x`);
$(`y`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "x" );
$( "y" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - 2: 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
