# Preval test case

# exa.md

> Normalize > Pattern > Exa
>
> From https://gist.github.com/nicolo-ribaudo/f8ac7916f89450f2ead77d99855b2098 via https://twitter.com/NicoloRibaudo/status/1364918178095185920

## Input

`````js filename=intro
var {
  val_1_1: { val_2_1, ...val_2_rest },
  val_1_2,
  val_1_3: [
    arr_1,
    arr_2,
    { val_3_1, ...val_3_rest },
    arr_4
  ],
  val_1_4
} = foo();
`````


## Settled


`````js filename=intro
const tmpAssignObjPatternRhs /*:unknown*/ = foo();
const tmpOPND /*:unknown*/ = tmpAssignObjPatternRhs.val_1_1;
tmpOPND.val_2_1;
const tmpCalleeParam$1 /*:array*/ = [`val_2_1`];
val_2_rest = $objPatternRest(tmpOPND, tmpCalleeParam$1, undefined);
tmpAssignObjPatternRhs.val_1_2;
const tmpOPND$1 /*:unknown*/ = tmpAssignObjPatternRhs.val_1_3;
const tmpArrPatternSplat /*:array*/ = [...tmpOPND$1];
const tmpArrPatternStep /*:unknown*/ = tmpArrPatternSplat[2];
tmpArrPatternStep.val_3_1;
const tmpCalleeParam$5 /*:array*/ = [`val_3_1`];
val_3_rest = $objPatternRest(tmpArrPatternStep, tmpCalleeParam$5, undefined);
tmpAssignObjPatternRhs.val_1_4;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignObjPatternRhs = foo();
const tmpOPND = tmpAssignObjPatternRhs.val_1_1;
tmpOPND.val_2_1;
val_2_rest = $objPatternRest(tmpOPND, [`val_2_1`], undefined);
tmpAssignObjPatternRhs.val_1_2;
const tmpOPND$1 = tmpAssignObjPatternRhs.val_1_3;
const tmpArrPatternStep = [...tmpOPND$1][2];
tmpArrPatternStep.val_3_1;
val_3_rest = $objPatternRest(tmpArrPatternStep, [`val_3_1`], undefined);
tmpAssignObjPatternRhs.val_1_4;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = foo();
const b = a.val_1_1;
b.val_2_1;
const c = [ "val_2_1" ];
val_2_rest = $objPatternRest( b, c, undefined );
a.val_1_2;
const d = a.val_1_3;
const e = [ ...d ];
const f = e[ 2 ];
f.val_3_1;
const g = [ "val_3_1" ];
val_3_rest = $objPatternRest( f, g, undefined );
a.val_1_4;
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


BAD@! Found 3 implicit global bindings:

foo, val_2_rest, val_3_rest


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
