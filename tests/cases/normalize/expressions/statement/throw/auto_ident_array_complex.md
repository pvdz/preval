# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > statement > throw > auto_ident_array_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw [$(1), 2, $(3)];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$2 = $(3);
let tmpThrowArg = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
throw tmpThrowArg;
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: ('<crash[ 1,2,3 ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
