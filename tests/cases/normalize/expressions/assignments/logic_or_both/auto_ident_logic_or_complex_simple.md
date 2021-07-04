# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || 2) || (a = $($(0)) || 2));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || 2) || (a = $($(0)) || 2));
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
  a = 2;
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(0);
  let tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$3);
  if (tmpNestedComplexRhs) {
  } else {
    tmpNestedComplexRhs = 2;
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
let a = $(tmpCalleeParam$1);
if (a) {
} else {
  a = 2;
}
const tmpCalleeParam = a;
if (a) {
  $(tmpCalleeParam);
} else {
  const tmpCalleeParam$3 = $(0);
  let tmpNestedComplexRhs = $(tmpCalleeParam$3);
  if (tmpNestedComplexRhs) {
  } else {
    tmpNestedComplexRhs = 2;
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
