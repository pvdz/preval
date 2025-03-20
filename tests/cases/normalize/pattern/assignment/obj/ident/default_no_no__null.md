# Preval test case

# default_no_no__null.md

> Normalize > Pattern > Assignment > Obj > Ident > Default no no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x } = null);
$('bad');
`````


## Settled


`````js filename=intro
x = null.x;
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = null.x;
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
x = null.x;
$( "bad" );
`````


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
