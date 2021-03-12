# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Assignments > Switch default > Auto ident unary tilde complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = ~$(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  const tmpUnaryArg = $(100);
  a = ~tmpUnaryArg;
}
$(a);
`````

## Output

`````js filename=intro
$(1);
const tmpUnaryArg = $(100);
const SSA_a = ~tmpUnaryArg;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: -101
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
