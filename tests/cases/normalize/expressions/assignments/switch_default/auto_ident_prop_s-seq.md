# Preval test case

# auto_ident_prop_s-seq.md

> Normalize > Expressions > Assignments > Switch default > Auto ident prop s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = (1, 2, b).c;
}
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 0;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      a = (1, 2, b).c;
    }
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  const tmpAssignRhsProp = b;
  a = tmpAssignRhsProp.c;
} else {
}
$(a, b);
`````

## Output

`````js filename=intro
$(1);
const b = { c: 1 };
$(1, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
