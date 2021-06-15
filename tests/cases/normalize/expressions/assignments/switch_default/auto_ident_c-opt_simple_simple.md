# Preval test case

# auto_ident_c-opt_simple_simple.md

> Normalize > Expressions > Assignments > Switch default > Auto ident c-opt simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = b?.["x"];
}
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 0;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      a = b?.[`x`];
    }
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed = `x`;
    const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
    a = tmpChainElementObject;
  } else {
  }
} else {
}
$(a);
`````

## Output

`````js filename=intro
$(1);
let a = undefined;
const b = { x: 1 };
const tmpIfTest$1 = b == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementObject = b.x;
  a = tmpChainElementObject;
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
