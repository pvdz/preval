# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Switch case block > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    ({ a } = $({ a: 1, b: 2 }));
  }
}
$(a);
`````

## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
  const tmpAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  const tmpClusterSSA_a /*:unknown*/ = tmpAssignObjPatternRhs.a;
  $(tmpClusterSSA_a);
} else {
  $(999);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === $(1)) {
  $($({ a: 1, b: 2 }).a);
} else {
  $(999);
}
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    {
      ({ a: a } = $({ a: 1, b: 2 }));
    }
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCalleeParam = { a: 1, b: 2 };
  const tmpAssignObjPatternRhs = $(tmpCalleeParam);
  a = tmpAssignObjPatternRhs.a;
} else {
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  const d = {
    a: 1,
    b: 2,
  };
  const e = $( d );
  const f = e.a;
  $( f );
}
else {
  $( 999 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '1', b: '2' }
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
