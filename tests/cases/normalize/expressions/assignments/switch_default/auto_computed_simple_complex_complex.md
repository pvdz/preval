# Preval test case

# auto_computed_simple_complex_complex.md

> Normalize > Expressions > Assignments > Switch default > Auto computed simple complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = { b: $(1) };
}
a[$("b")] = $(2);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    a = { b: $(1) };
  } else {
  }
}
a[$(`b`)] = $(2);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
const tmpAssignComMemLhsObj = a;
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a);
`````

## Output


`````js filename=intro
$(1);
const tmpObjLitVal = $(1);
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedRhs = $(2);
const a = { b: tmpObjLitVal };
a[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 1 );
const b = $( "b" );
const c = $( 2 );
const d = { b: a };
d[b] = c;
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'b'
 - 4: 2
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
