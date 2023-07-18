# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Computed prop prop > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
let obj = {};
obj[$({ a: 1, b: 2 })];
$(a);
`````

## Pre Normal

`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
let obj = {};
obj[$({ a: 1, b: 2 })];
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let obj = {};
const tmpCompObj = obj;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpCompProp = tmpCallCallee(tmpCalleeParam);
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
const obj = {};
const tmpCalleeParam = { a: 1, b: 2 };
const tmpCompProp = $(tmpCalleeParam);
obj[tmpCompProp];
$(999);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = {
a: 1,
b: 2
;
const c = $( b );
a[ c ];
$( 999 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
