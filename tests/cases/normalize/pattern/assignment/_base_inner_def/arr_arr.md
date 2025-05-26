# Preval test case

# arr_arr.md

> Normalize > Pattern > Assignment > Base inner def > Arr arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const a = 10;
([[ x = a ]] = [[]]);
$(a);
`````


## Settled


`````js filename=intro
x = 10;
$(10);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = 10;
$(10);
`````


## PST Settled
With rename=true

`````js filename=intro
x = 10;
$( 10 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = 10;
const tmpArrElement = [];
const tmpArrAssignPatternRhs = [tmpArrElement];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
const tmpArrPatternStep = tmpArrPatternSplat[0];
const tmpArrPatternSplat$1 = [...tmpArrPatternStep];
const tmpAPBD = tmpArrPatternSplat$1[0];
const tmpIfTest = tmpAPBD === undefined;
if (tmpIfTest) {
  x = a;
  $(a);
} else {
  x = tmpAPBD;
  $(a);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ Cannot set property x of #<Object> which has only a getter ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
