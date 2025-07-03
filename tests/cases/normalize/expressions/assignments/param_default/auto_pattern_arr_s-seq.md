# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Assignments > Param default > Auto pattern arr s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
function f(p = ([a] = ($(10), $(20), [1, 2]))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
$(10);
$(20);
$(undefined);
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
$(10);
$(20);
$(undefined);
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
[ ...a ];
$( 10 );
$( 20 );
$( undefined );
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    $(10);
    $(20);
    const tmpNestedAssignArrPatternRhs = [1, 2];
    const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    a = tmpArrPatternSplat[0];
    p = tmpNestedAssignArrPatternRhs;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let tmpBindingPatternArrRoot = { a: 999, b: 1000 };
let tmpArrPatternSplat$1 = [...tmpBindingPatternArrRoot];
let a = tmpArrPatternSplat$1[0];
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ArrayExpression
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
