# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident unary typeof complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = typeof $(arg)):
}
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === (a = typeof $(arg))) {
  } else {
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpUnaryArg = $(arg);
a = typeof tmpUnaryArg;
let tmpBinBothRhs = a;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a, arg);
`````

## Output


`````js filename=intro
$(1);
const tmpUnaryArg = $(1);
const a = typeof tmpUnaryArg;
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 1 );
const b = typeof a;
$( b, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
