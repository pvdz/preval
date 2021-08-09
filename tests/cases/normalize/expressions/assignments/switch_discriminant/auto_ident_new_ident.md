# Preval test case

# auto_ident_new_ident.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident new ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = new $(1))) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = new $(1));
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = new $(1);
let tmpSwitchDisc = a;
$(100);
$(a);
`````

## Output

`````js filename=intro
const a = new $(1);
$(100);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
