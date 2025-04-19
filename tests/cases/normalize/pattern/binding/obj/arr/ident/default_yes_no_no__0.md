# Preval test case

# default_yes_no_no__0.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default yes no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [y = 'fail'] } = 0;
$('bad');
`````


## Settled


`````js filename=intro
const tmpOPND /*:unknown*/ = $Number_prototype.x;
[...tmpOPND];
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPND = $Number_prototype.x;
[...tmpOPND];
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.x;
[ ...a ];
$( "bad" );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
