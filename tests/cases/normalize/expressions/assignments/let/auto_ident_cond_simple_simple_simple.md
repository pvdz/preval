# Preval test case

# auto_ident_cond_simple_simple_simple.md

> normalize > expressions > assignments > let > auto_ident_cond_simple_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = 1 ? 2 : $($(100)));
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz;
let tmpNestedComplexRhs = undefined;
{
  tmpNestedComplexRhs = 2;
}
a = tmpNestedComplexRhs;
xyz = tmpNestedComplexRhs;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz;
let tmpNestedComplexRhs = undefined;
tmpNestedComplexRhs = 2;
a = tmpNestedComplexRhs;
xyz = tmpNestedComplexRhs;
$(xyz);
$(a);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
