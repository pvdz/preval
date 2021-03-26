# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(1)) || $($(2))) && (a = $($(0)) || $($(1)) || $($(2))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(1)) || $($(2))) && (a = $($(0)) || $($(1)) || $($(2))));
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
  } else {
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(2);
    a = tmpCallCallee$5(tmpCalleeParam$5);
  }
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpCallCallee$7 = $;
  const tmpCalleeParam$7 = $(0);
  let tmpNestedComplexRhs = tmpCallCallee$7(tmpCalleeParam$7);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCallCallee$9 = $;
    const tmpCalleeParam$9 = $(1);
    tmpNestedComplexRhs = tmpCallCallee$9(tmpCalleeParam$9);
    if (tmpNestedComplexRhs) {
    } else {
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
  } else {
    const tmpCalleeParam$5 = $(2);
    SSA_a = $(tmpCalleeParam$5);
  }
}
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
  const tmpCalleeParam$7 = $(0);
  let tmpNestedComplexRhs = $(tmpCalleeParam$7);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCalleeParam$9 = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$9);
    if (tmpNestedComplexRhs) {
    } else {
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
 - 5: 0
 - 6: 0
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
