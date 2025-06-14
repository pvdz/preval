# Preval test case

# call.md

> Expr order > Call
>
> The order of occurrence is relevant.

In this case the code starts by a function call where we pass a variable and then modify that variable in the second position of a call arg.

The result is basically calling `$(0, 1)`. However, if we transform it incorrectly (and we did, initially), then we risk outlining the `++i` without caching its original value. This would lead to `$(1, 1)`.

This is an example of why, if we outline one value, we must outline all values, and maintain the order. We shouldn't worry too much about fresh variables. They ought to fold up in later steps so it's no big deal to be redundant here. Scanning for occurrences is going to be much harder.

## Input

`````js filename=intro
let i = 0;
$(i, ++i);
`````


## Settled


`````js filename=intro
$(0, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let i = 0;
let tmpCalleeParam = i;
const tmpPostUpdArgIdent = $coerce(i, `number`);
i = tmpPostUpdArgIdent + 1;
let tmpCalleeParam$1 = i;
$(tmpCalleeParam, i);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
