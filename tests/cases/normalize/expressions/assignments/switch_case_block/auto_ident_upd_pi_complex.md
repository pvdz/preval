# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Assignments > Switch case block > Auto ident upd pi complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = ++$($(b)).x;
  }
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    {
      a = ++$($(b)).x;
    }
  } else {
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(b);
  const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  a = tmpNestedPropCompoundComplexRhs;
} else {
}
$(a, b);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCalleeParam = $(b);
  const tmpNestedAssignObj = $(tmpCalleeParam);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  $(tmpNestedPropCompoundComplexRhs, b);
} else {
  const a = { a: 999, b: 1000 };
  $(a, b);
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
  const e = $( a );
  const f = $( e );
  const g = f.x;
  const h = g + 1;
  f.x = h;
  $( h, a );
}
else {
  const i = {
a: 999,
b: 1000
  ;
  $( i, a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { x: '1' }
 - 4: { x: '1' }
 - 5: 2, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
