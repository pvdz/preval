# Preval test case

# auto_ident_s-seq.md

> normalize > expressions > assignments > throw > auto_ident_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
throw (a = ($(1), $(2), x));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let tmpThrowArg;
$(1);
$(2);
const tmpNestedComplexRhs = x;
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg;
$(1);
$(2);
a = 1;
tmpThrowArg = 1;
throw tmpThrowArg;
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: Same
