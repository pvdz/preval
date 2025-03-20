# Preval test case

# string_split_no_arg.md

> Type tracked > String method > String split no arg
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello world'.split());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`hello world`];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`hello world`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "hello world" ];
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['hello world']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
