# Preval test case

# one_pattern.md

> Normalize > Switch > One pattern
>
> A switch that contains a pattern needs to have that pattern to be normalized before being able to decompose the switch itself because all bindings need to be declared before the switch in order to make the decomposition safe/correct.

Should end up something like this (will take some time before we get there :p)

```js
let bindingPatternArrRoot = [4, 5, 6];
let arrPatternSplat = [...bindingPatternArrRoot];
let x = arrPatternSplat[0];
$(x);
```

## Input

`````js filename=intro
switch (1) {
  case 1:
    let [x] = [4, 5, 6];
  case 2:
    $(x);
}
`````


## Settled


`````js filename=intro
$(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
let tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 2;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
  const tmpArrAssignPatternRhs = [4, 5, 6];
  const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
  x = tmpArrPatternSplat[0];
} else {
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(x);
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
 - 1: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
