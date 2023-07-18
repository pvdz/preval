# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident delete prop simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = delete arg.y):
}
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === (a = delete arg.y)) {
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
a = delete arg.y;
let tmpBinBothRhs = a;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a, arg);
`````

## Output

`````js filename=intro
$(1);
const arg = { y: 1 };
const a = delete arg.y;
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = { y: 1 };
const b = deletea.y;
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
