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

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    [a] = ($(10), $(20), [1, 2]);
    $(a);
  } else {
  }
}
`````

## Normalized


`````js filename=intro
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  $(10);
  $(20);
  const arrAssignPatternRhs = [1, 2];
  const arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  $(a);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 10 );
$( 20 );
$( 1 );
`````

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

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
