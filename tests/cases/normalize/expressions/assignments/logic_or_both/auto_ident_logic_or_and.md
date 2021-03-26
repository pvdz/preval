# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = $($(0)) || ($($(1)) && $($(2)))) || (a = $($(0)) || ($($(1)) && $($(2))))
);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || ($($(1)) && $($(2)))) || (a = $($(0)) || ($($(1)) && $($(2)))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(0);
a = tmpCallCallee$1(tmpCalleeParam$1);
if (a) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(1);
  a = tmpCallCallee$3(tmpCalleeParam$3);
  if (a) {
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(2);
    a = tmpCallCallee$5(tmpCalleeParam$5);
  }
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpCallCallee$7 = $;
  const tmpCalleeParam$7 = $(0);
  let tmpNestedComplexRhs = tmpCallCallee$7(tmpCalleeParam$7);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCallCallee$9 = $;
    const tmpCalleeParam$9 = $(1);
    tmpNestedComplexRhs = tmpCallCallee$9(tmpCalleeParam$9);
    if (tmpNestedComplexRhs) {
      const tmpCallCallee$11 = $;
      const tmpCalleeParam$11 = $(2);
      tmpNestedComplexRhs = tmpCallCallee$11(tmpCalleeParam$11);
    }
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(0);
let SSA_a = $(tmpCalleeParam$1);
if (SSA_a) {
} else {
  const tmpCalleeParam$3 = $(1);
  SSA_a = $(tmpCalleeParam$3);
  if (SSA_a) {
    const tmpCalleeParam$5 = $(2);
    SSA_a = $(tmpCalleeParam$5);
  }
}
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
} else {
  const tmpCalleeParam$7 = $(0);
  let tmpNestedComplexRhs = $(tmpCalleeParam$7);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCalleeParam$9 = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$9);
    if (tmpNestedComplexRhs) {
      const tmpCalleeParam$11 = $(2);
      tmpNestedComplexRhs = $(tmpCalleeParam$11);
    }
  }
  SSA_a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
