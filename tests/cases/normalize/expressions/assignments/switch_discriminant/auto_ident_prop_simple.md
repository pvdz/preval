# Preval test case

# auto_ident_prop_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident prop simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ((a = b.c)) {
  default:
    $(100);
}
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = b.c);
  if (true) {
    $(100);
  } else {
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
a = b.c;
let tmpSwitchDisc = a;
$(100);
$(a, b);
`````

## Output

`````js filename=intro
$(100);
const b = { c: 1 };
$(1, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
