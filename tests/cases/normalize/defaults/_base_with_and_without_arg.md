# Preval test case

# _base_with_and_without_arg.md

> Normalize > Defaults > Base with and without arg
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = "foo") { 
  return a; 
}

$(f('x'));
$(f());
`````


## Settled


`````js filename=intro
$(`x`);
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`x`);
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "x" );
$( "foo" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
