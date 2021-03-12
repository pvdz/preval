# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Switch default > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = ($($(1)) && $($(1))) || $($(2));
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
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    a = tmpCallCallee$1(tmpCalleeParam$1);
  }
  if (a) {
  } else {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    a = tmpCallCallee$2(tmpCalleeParam$2);
  }
}
$(a);
`````

## Output

`````js filename=intro
$(1);
const tmpCalleeParam = $(1);
let SSA_a = $(tmpCalleeParam);
if (SSA_a) {
  const tmpCalleeParam$1 = $(1);
  SSA_a = $(tmpCalleeParam$1);
}
if (SSA_a) {
} else {
  const tmpCalleeParam$2 = $(2);
  SSA_a = $(tmpCalleeParam$2);
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
