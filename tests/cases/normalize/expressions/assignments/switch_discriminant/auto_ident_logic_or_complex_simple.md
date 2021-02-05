# Preval test case

# auto_ident_logic_or_complex_simple.md

> normalize > expressions > assignments > switch_discriminant > auto_ident_logic_or_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = $($(0)) || 2)) {
  default:
    $(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpSwitchTest;
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
if (tmpNestedComplexRhs) {
} else {
  tmpNestedComplexRhs = 2;
}
a = tmpNestedComplexRhs;
tmpSwitchTest = tmpNestedComplexRhs;
{
  let tmpFallthrough = false;
  {
    ('default case:');
    $(100);
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpSwitchTest;
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
if (tmpNestedComplexRhs) {
} else {
  tmpNestedComplexRhs = 2;
}
a = tmpNestedComplexRhs;
tmpSwitchTest = tmpNestedComplexRhs;
$(100);
$(a);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 100
 - 4: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
