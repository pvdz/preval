# Preval test case

# default_yes_no_no__str.md

> Normalize > Pattern > Assignment > Arr > Arr > Ident > Default yes no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[x = $('fail')]] = 'abc');
$(x);
`````


## Settled


`````js filename=intro
x = `a`;
$(`a`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = `a`;
$(`a`);
`````


## PST Settled
With rename=true

`````js filename=intro
x = "a";
$( "a" );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
