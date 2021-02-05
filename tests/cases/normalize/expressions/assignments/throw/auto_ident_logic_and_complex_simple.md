# Preval test case

# auto_ident_logic_and_complex_simple.md

> normalize > expressions > assignments > throw > auto_ident_logic_and_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = $($(1)) && 2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
if (tmpNestedComplexRhs) {
  tmpNestedComplexRhs = 2;
}
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
if (tmpNestedComplexRhs) {
  tmpNestedComplexRhs = 2;
}
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ 2 ]>')

Normalized calls: Same

Final output calls: Same
