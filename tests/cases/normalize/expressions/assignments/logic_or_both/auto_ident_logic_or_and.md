# Preval test case

# auto_ident_logic_or_and.md

> normalize > expressions > assignments > logic_or_both > auto_ident_logic_or_and
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

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(0);
let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpNestedComplexRhs) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(1);
  tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
  if (tmpNestedComplexRhs) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$3);
  }
}
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
} else {
  const tmpCallCallee$4 = $;
  const tmpCalleeParam$4 = $(0);
  let tmpNestedComplexRhs$1 = tmpCallCallee$4(tmpCalleeParam$4);
  if (tmpNestedComplexRhs$1) {
  } else {
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(1);
    tmpNestedComplexRhs$1 = tmpCallCallee$5(tmpCalleeParam$5);
    if (tmpNestedComplexRhs$1) {
      const tmpCallCallee$6 = $;
      const tmpCalleeParam$6 = $(2);
      tmpNestedComplexRhs$1 = tmpCallCallee$6(tmpCalleeParam$6);
    }
  }
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam;
const tmpCalleeParam$1 = $(0);
let tmpNestedComplexRhs = $(tmpCalleeParam$1);
if (tmpNestedComplexRhs) {
} else {
  const tmpCalleeParam$2 = $(1);
  tmpNestedComplexRhs = $(tmpCalleeParam$2);
  if (tmpNestedComplexRhs) {
    const tmpCalleeParam$3 = $(2);
    tmpNestedComplexRhs = $(tmpCalleeParam$3);
  }
}
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
} else {
  const tmpCalleeParam$4 = $(0);
  let tmpNestedComplexRhs$1 = $(tmpCalleeParam$4);
  if (tmpNestedComplexRhs$1) {
  } else {
    const tmpCalleeParam$5 = $(1);
    tmpNestedComplexRhs$1 = $(tmpCalleeParam$5);
    if (tmpNestedComplexRhs$1) {
      const tmpCalleeParam$6 = $(2);
      tmpNestedComplexRhs$1 = $(tmpCalleeParam$6);
    }
  }
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
$(tmpCalleeParam);
$(a);
`````

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

Normalized calls: Same

Final output calls: Same
