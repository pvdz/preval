# Preval test case

# auto_ident_array_simple.md

> normalize > expressions > assignments > throw > auto_ident_array_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = [1, 2, 3]);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [1, 2, 3];
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [1, 2, 3];
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ 1,2,3 ]>')

Normalized calls: Same

Final output calls: Same