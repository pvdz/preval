# Preval test case

# auto_ident_computed_simple_simple.md

> Normalize > Expressions > Assignments > Switch case block > Auto ident computed simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = b["c"];
  }
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    {
      a = b[`c`];
    }
  } else {
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  a = b.c;
} else {
}
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 1 };
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(1, b);
} else {
  const a = { a: 999, b: 1000 };
  $(a, b);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( 1 );
const c = $( 1 );
const d = b === c;
if (d) {
  $( 1, a );
}
else {
  const e = {
    a: 999,
    b: 1000,
  };
  $( e, a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
