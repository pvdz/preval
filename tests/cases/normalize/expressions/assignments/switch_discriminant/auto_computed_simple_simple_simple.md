# Preval test case

# auto_computed_simple_simple_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto computed simple simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = { b: $(1) })) {
  default:
    $(100);
}
a["b"] = 2;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = { b: $(1) });
  if (true) {
    $(100);
  } else {
  }
}
a[`b`] = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpSwitchDisc = a;
$(100);
a.b = 2;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
$(100);
const a = { b: tmpObjLitVal };
a.b = 2;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
