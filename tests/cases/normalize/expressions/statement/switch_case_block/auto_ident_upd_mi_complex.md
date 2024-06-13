# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Statement > Switch case block > Auto ident upd mi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    --$($(b)).x;
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
      --$($(b)).x;
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
  const tmpAssignMemLhsObj = tmpCallCallee(tmpCalleeParam);
  const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
  const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  const tmpAssignMemRhs = tmpCompoundAssignLhs - 1;
  tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
} else {
}
$(a, b);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCalleeParam = $(b);
  const tmpAssignMemLhsObj = $(tmpCalleeParam);
  const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
  const tmpAssignMemRhs = tmpCompoundAssignLhs - 1;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
} else {
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = {
  a: 999,
  b: 1000,
};
const c = $( 1 );
const d = $( 1 );
const e = c === d;
if (e) {
  const f = $( a );
  const g = $( f );
  const h = g.x;
  const i = h - 1;
  g.x = i;
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { x: '1' }
 - 4: { x: '1' }
 - 5: { a: '999', b: '1000' }, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
