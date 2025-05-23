# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Bindings > Switch case > Auto pattern arr s-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let [a] = ($(10), $(20), [1, 2]);
    $(a);
}
`````


## Settled


`````js filename=intro
$(10);
$(20);
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
$(20);
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
$( 20 );
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  $(10);
  $(20);
  const tmpArrAssignPatternRhs = [1, 2];
  const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
  a = tmpArrPatternSplat[0];
  $(a);
} else {
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
