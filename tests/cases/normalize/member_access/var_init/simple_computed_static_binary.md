# Preval test case

# dynamic_static.md

> normalize > member_access > dynamic_static
>
> Member expressions with literal keys should be inlined. When they are static expressions they should still be normalized after normalization.

## Input

`````js filename=intro
const obj = {foo: 10};
let x = obj['fo' + 'o'];
$(x);
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
const tmpCompObj = obj;
const tmpCompProp = 'fo' + 'o';
let x = tmpCompObj[tmpCompProp];
$(x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
