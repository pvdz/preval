# Preval test case

# default_no_no_no__empty_str.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default no no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { y } } = '';
$('bad');
`````


## Settled


`````js filename=intro
const tmpOPND /*:unknown*/ = $String_prototype.x;
tmpOPND.y;
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$String_prototype.x.y;
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $String_prototype.x;
a.y;
$( "bad" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
