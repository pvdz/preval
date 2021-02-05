# Preval test case

# auto_ident_logic_and_complex_simple.md

> normalize > expressions > assignments > if > auto_ident_logic_and_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = $($(1)) && 2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
if (tmpNestedComplexRhs) {
  tmpNestedComplexRhs = 2;
}
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
tmpIfTest;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
if (tmpNestedComplexRhs) {
  tmpNestedComplexRhs = 2;
}
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
