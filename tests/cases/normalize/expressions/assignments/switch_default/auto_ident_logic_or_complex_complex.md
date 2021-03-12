# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Switch default > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = $($(0)) || $($(2));
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(2);
    a = tmpCallCallee$1(tmpCalleeParam$1);
  }
}
$(a);
`````

## Output

`````js filename=intro
$(1);
const tmpCalleeParam = $(0);
let SSA_a = $(tmpCalleeParam);
if (SSA_a) {
} else {
  const tmpCalleeParam$1 = $(2);
  SSA_a = $(tmpCalleeParam$1);
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 0
 - 4: 2
 - 5: 2
 - 6: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
