# Preval test case

# regression_step1.md

> Normalize > Switch > Regression step1
>
> Transformation after one step gets screwed

Original input was

```js
let b = [];

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case ([b] = $([$(2)])):
}
$(a, b);
```

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  if ((tmpFallthrough || (tmpSwitchTest === ([b] = $([$(2)]))))) {
    ("case 0:");
    {}
    tmpFallthrough = true;
  }
}

$(a, b);
`````

## Settled


`````js filename=intro
$(1);
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_b /*:unknown*/ = arrPatternSplat[0];
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpClusterSSA_b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpArrElement = $(2);
const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
const tmpClusterSSA_b = [...tmpNestedAssignArrPatternRhs][0];
$({ a: 999, b: 1000 }, tmpClusterSSA_b);
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  if (tmpFallthrough || tmpSwitchTest === ([b] = $([$(2)]))) {
    `case 0:`;
    {
    }
    tmpFallthrough = true;
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  const tmpBinBothLhs = tmpSwitchTest;
  let tmpBinBothRhs = undefined;
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  tmpBinBothRhs = tmpNestedAssignArrPatternRhs;
  tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
}
if (tmpIfTest) {
  tmpFallthrough = true;
  $(a, b);
} else {
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ...c ];
const e = d[ 0 ];
const f = {
  a: 999,
  b: 1000,
};
$( f, e );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: [2]
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope