# Preval test case

# auto_ident_logic_and_simple_simple.md

> normalize > expressions > assignments > throw > auto_ident_logic_and_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = 1 && 2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg;
let tmpNestedComplexRhs = 1;
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
let tmpNestedComplexRhs = 1;
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
 - eval returned: ('<crash[ 2 ]>')

Normalized calls: Same

Final output calls: Same
