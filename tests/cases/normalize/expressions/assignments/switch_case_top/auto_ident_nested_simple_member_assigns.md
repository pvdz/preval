# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Assignments > Switch case top > Auto ident nested simple member assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = b.x = b.x = b.x = b.x = b.x = b.x = c;
}
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    a = b.x = b.x = b.x = b.x = b.x = b.x = c;
  } else {
  }
}
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const varInitAssignLhsComputedRhs$7 = c;
  b.x = varInitAssignLhsComputedRhs$7;
  const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$7;
  b.x = varInitAssignLhsComputedRhs$5;
  const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$5;
  b.x = varInitAssignLhsComputedRhs$3;
  const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
  b.x = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  b.x = varInitAssignLhsComputedRhs;
  const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  b.x = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
} else {
}
$(a, b, c);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  b.x = 3;
  b.x = 3;
  b.x = 3;
  b.x = 3;
  b.x = 3;
  b.x = 3;
  $(3, b, 3);
} else {
  const a = { a: 999, b: 1000 };
  $(a, b, 3);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( 1 );
const c = $( 1 );
const d = b === c;
if (d) {
  a.x = 3;
  a.x = 3;
  a.x = 3;
  a.x = 3;
  a.x = 3;
  a.x = 3;
  $( 3, a, 3 );
}
else {
  const e = {
a: 999,
b: 1000
  ;
  $( e, a, 3 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
