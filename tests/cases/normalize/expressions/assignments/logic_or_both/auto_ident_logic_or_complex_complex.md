# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(2))) || (a = $($(0)) || $($(2))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(2))) || (a = $($(0)) || $($(2))));
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
  const tmpCalleeParam$2 = $(2);
  a = tmpCallCallee$2(tmpCalleeParam$2);
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(0);
  let tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$3);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCallCallee$4 = $;
    const tmpCalleeParam$4 = $(2);
    tmpNestedComplexRhs = tmpCallCallee$4(tmpCalleeParam$4);
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
  const tmpCalleeParam$2 = $(2);
  SSA_a = $(tmpCalleeParam$2);
}
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
} else {
  const tmpCalleeParam$3 = $(0);
  let tmpNestedComplexRhs = $(tmpCalleeParam$3);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCalleeParam$4 = $(2);
    tmpNestedComplexRhs = $(tmpCalleeParam$4);
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
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
