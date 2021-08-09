# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > Switch case top > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = { x: 1, y: 2, z: 3 };
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    a = { x: 1, y: 2, z: 3 };
  } else {
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  a = { x: 1, y: 2, z: 3 };
} else {
}
$(a);
`````

## Output

`````js filename=intro
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpClusterSSA_a = { x: 1, y: 2, z: 3 };
  $(tmpClusterSSA_a);
} else {
  const a = { a: 999, b: 1000 };
  $(a);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
