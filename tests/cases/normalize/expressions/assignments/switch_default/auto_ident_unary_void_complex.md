# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Switch default > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = void $(100);
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    a = void $(100);
  } else {
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
$(100);
a = undefined;
$(a);
`````

## Output

`````js filename=intro
$(1);
$(100);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
