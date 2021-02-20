# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = $($(0)) || ($($(1)) && $($(2)))) && (a = $($(0)) || ($($(1)) && $($(2))))
);
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
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(1);
  a = tmpCallCallee$2(tmpCalleeParam$2);
  if (a) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    a = tmpCallCallee$3(tmpCalleeParam$3);
  }
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpCallCallee$4 = $;
  const tmpCalleeParam$4 = $(0);
  let tmpNestedComplexRhs = tmpCallCallee$4(tmpCalleeParam$4);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(1);
    tmpNestedComplexRhs = tmpCallCallee$5(tmpCalleeParam$5);
    if (tmpNestedComplexRhs) {
      const tmpCallCallee$6 = $;
      const tmpCalleeParam$6 = $(2);
      tmpNestedComplexRhs = tmpCallCallee$6(tmpCalleeParam$6);
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
  const tmpCalleeParam$2 = $(1);
  SSA_a = $(tmpCalleeParam$2);
  if (SSA_a) {
    const tmpCalleeParam$3 = $(2);
    SSA_a = $(tmpCalleeParam$3);
  }
}
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
  const tmpCalleeParam$4 = $(0);
  let tmpNestedComplexRhs = $(tmpCalleeParam$4);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCalleeParam$5 = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$5);
    if (tmpNestedComplexRhs) {
      const tmpCalleeParam$6 = $(2);
      tmpNestedComplexRhs = $(tmpCalleeParam$6);
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
 - 7: 0
 - 8: 0
 - 9: 1
 - 10: 1
 - 11: 2
 - 12: 2
 - 13: 2
 - 14: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
