# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Assignments > Switch case block > Auto pattern arr s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    [a] = ($(10), $(20), [1, 2]);
  }
}
$(a);
`````

## Settled


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const a /*:unknown*/ = arrPatternSplat[0];
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(10);
  $(20);
  $(1);
} else {
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const a = [...bindingPatternArrRoot][0];
if ($(1) === $(1)) {
  $(10);
  $(20);
  $(1);
} else {
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    {
      [a] = ($(10), $(20), [1, 2]);
    }
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  $(10);
  $(20);
  const arrAssignPatternRhs = [1, 2];
  const arrPatternSplat$1 = [...arrAssignPatternRhs];
  a = arrPatternSplat$1[0];
  $(a);
} else {
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ ...a ];
const c = b[ 0 ];
const d = $( 1 );
const e = $( 1 );
const f = d === e;
if (f) {
  $( 10 );
  $( 20 );
  $( 1 );
}
else {
  $( c );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope