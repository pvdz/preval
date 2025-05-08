# Preval test case

# default_yes_no__empty_str.md

> Normalize > Pattern > Assignment > Arr > Ident > Default yes no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([x = $('pass')] = '');
$(x);
`````


## Settled


`````js filename=intro
x = $(`pass`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = $(`pass`);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
x = $( "pass" );
$( x );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
