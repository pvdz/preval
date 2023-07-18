# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Statement > Throw > Auto ident prop complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
throw $(b).c;
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
throw $(b).c;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpThrowArg = tmpCompObj.c;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpThrowArg = tmpCompObj.c;
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
throw c;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
