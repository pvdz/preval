# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> normalize > expressions > assignments > throw > auto_ident_cond_simple_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = 1 ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg;
let tmpNestedComplexRhs = undefined;
{
  tmpNestedComplexRhs = $(60);
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
let tmpNestedComplexRhs = undefined;
tmpNestedComplexRhs = $(60);
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
$(a);
`````

## Result

Should call `$` with:
 - 1: 60
 - eval returned: ('<crash[ 60 ]>')

Normalized calls: Same

Final output calls: Same
