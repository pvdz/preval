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

#TODO

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
  const tmpCallCallee = $;
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  tmpBinBothRhs = tmpNestedAssignArrPatternRhs;
  tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
}
if (tmpIfTest) {
  tmpFallthrough = true;
} else {
}
$(a, b);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
$(1);
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_b = arrPatternSplat[0];
$(a, tmpClusterSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
$( 1 );
const b = $( 2 );
const c = [ b ];
const d = $( c );
const e = [ ... d ];
const f = e[ 0 ];
$( a, f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: [2]
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
