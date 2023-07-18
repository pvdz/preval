# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = function f() {}):
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (
    tmpSwitchDisc ===
    (a = function f() {
      debugger;
    })
  ) {
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
const f = function () {
  debugger;
  return undefined;
};
a = f;
let tmpBinBothRhs = a;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
$(1);
const f = function () {
  debugger;
  return undefined;
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = function() {
  debugger;
  return undefined;
},;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
