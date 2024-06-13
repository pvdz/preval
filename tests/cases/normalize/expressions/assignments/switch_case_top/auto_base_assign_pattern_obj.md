# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Switch case top > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = { b } = $({ b: $(2) });
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    a = { b: b } = $({ b: $(2) });
  } else {
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
  b = tmpNestedAssignObjPatternRhs.b;
  a = tmpNestedAssignObjPatternRhs;
} else {
}
$(a, b);
`````

## Output


`````js filename=intro
const b = {};
const a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
  const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
  $(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
} else {
  $(a, b);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = {
  a: 999,
  b: 1000,
};
const c = $( 1 );
const d = $( 1 );
const e = c === d;
if (e) {
  const f = $( 2 );
  const g = { b: f };
  const h = $( g );
  const i = h.b;
  $( h, i );
}
else {
  $( b, a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: { b: '2' }
 - 5: { b: '2' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
