# Preval test case

# string_replace_regex_obj_func2.md

> Type tracked > String method > String replace regex obj func2
>
> This is an exotic case, targeting a specific obfuscation, but also a proof of concept that this can be done.
> It'll be harder to come up with generic solutions for these kinds of cases.

## Input

`````js filename=intro
const obj = {a: 1, b: 2};
const rex = /\w.\w/g;
$('a is not b'.replace(rex, (c) => obj[c]));
`````


## Settled


`````js filename=intro
$(`undefinedundefinedoundefined`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`undefinedundefinedoundefined`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "undefinedundefinedoundefined" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'undefinedundefinedoundefined'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
