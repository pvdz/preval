# Preval test case

# default_yes_no_no__str.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [y = 'fail'] }) {
  return 'bad';
}
$(f('abc', 10));
`````


## Settled


`````js filename=intro
const tmpOPND /*:unknown*/ = $String_prototype.x;
[...tmpOPND];
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPND = $String_prototype.x;
[...tmpOPND];
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $String_prototype.x;
[ ...a ];
$( "bad" );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
