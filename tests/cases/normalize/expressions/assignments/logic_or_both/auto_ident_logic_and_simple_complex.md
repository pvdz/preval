# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident logic and simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 1 && $($(1))) || (a = 1 && $($(1))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 1 && $($(1))) || (a = 1 && $($(1))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = 1;
if (a) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  a = tmpCallCallee$1(tmpCalleeParam$1);
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs = 1;
  if (tmpNestedComplexRhs) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$3);
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let SSA_a = 1;
if (SSA_a) {
  const tmpCalleeParam$1 = $(1);
  SSA_a = $(tmpCalleeParam$1);
}
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs = 1;
  if (tmpNestedComplexRhs) {
    const tmpCalleeParam$3 = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$3);
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
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
