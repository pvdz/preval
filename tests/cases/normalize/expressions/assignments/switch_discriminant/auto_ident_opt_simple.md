# Preval test case

# auto_ident_opt_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident opt simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ((a = b?.x)) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = b?.x);
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
} else {
}
let tmpSwitchDisc = a;
$(100);
$(a);
`````

## Output

`````js filename=intro
$(100);
$(1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
