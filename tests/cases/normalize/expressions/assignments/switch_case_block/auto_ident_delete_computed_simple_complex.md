# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Assignments > Switch case block > Auto ident delete computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = delete arg[$("y")];
  }
}
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    {
      a = delete arg[$(`y`)];
    }
  } else {
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpDeleteCompObj = arg;
  const tmpDeleteCompProp = $(`y`);
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
} else {
}
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpDeleteCompProp = $(`y`);
  const tmpClusterSSA_a = delete arg[tmpDeleteCompProp];
  $(tmpClusterSSA_a, arg);
} else {
  const a = { a: 999, b: 1000 };
  $(a, arg);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( 1 );
const c = $( 1 );
const d = b === c;
if (d) {
  const e = $( "y" );
  const f = delete a[ e ];
  $( f, a );
}
else {
  const g = {
    a: 999,
    b: 1000,
  };
  $( g, a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'y'
 - 4: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
