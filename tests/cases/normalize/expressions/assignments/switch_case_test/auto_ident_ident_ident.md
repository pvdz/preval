# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = b = 2):
}
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === (a = b = 2)) {
  } else {
  }
}
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
b = 2;
a = 2;
let tmpBinBothRhs = a;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a, b, c);
`````

## Output


`````js filename=intro
$(1);
$(2, 2, 2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2, 2, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
