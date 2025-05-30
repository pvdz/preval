# Preval test case

# default_yes_no__arr_empty.md

> Normalize > Pattern > Binding > Arr > Arr > Default yes no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[] = $(['pass2'])] = [];
$('ok');
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`pass2`];
const tmpArrPatternStep /*:unknown*/ = $(tmpCalleeParam);
[...tmpArrPatternStep];
$(`ok`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrPatternStep = $([`pass2`]);
[...tmpArrPatternStep];
$(`ok`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "pass2" ];
const b = $( a );
[ ...b ];
$( "ok" );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['pass2']
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
