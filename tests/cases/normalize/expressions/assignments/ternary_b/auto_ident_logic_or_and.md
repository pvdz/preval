# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (a = $($(0)) || ($($(1)) && $($(2)))) : $(200));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (a = $($(0)) || ($($(1)) && $($(2)))) : $(200));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(0);
  let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$3);
    if (tmpNestedComplexRhs) {
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = $(2);
      tmpNestedComplexRhs = tmpCallCallee$5(tmpCalleeParam$5);
    }
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCalleeParam$1 = $(0);
  let tmpNestedComplexRhs = $(tmpCalleeParam$1);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCalleeParam$3 = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$3);
    if (tmpNestedComplexRhs) {
      const tmpCalleeParam$5 = $(2);
      tmpNestedComplexRhs = $(tmpCalleeParam$5);
    }
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - 8: 2
 - 9: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
