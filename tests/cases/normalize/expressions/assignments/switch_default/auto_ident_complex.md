# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Assignments > Switch default > Auto ident complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = $(b);
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  a = $(b);
}
$(a, b);
`````

## Output

`````js filename=intro
$(1);
const SSA_a = $(1);
$(SSA_a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
