# Preval test case

# dynamic_static.md

> normalize > member_access > dynamic_static
>
> Member expressions with literal keys should be inlined. When they are static expressions they should still be normalized after normalization.

## Input

`````js filename=intro
const obj = {foo: 10};
obj['fo' + 'o'];
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
const tmpCompObj = obj;
const tmpCompProp = 'fo' + 'o';
tmpCompObj[tmpCompProp];
`````

## Output

`````js filename=intro
const obj = { foo: 10 };
const tmpCompProp = 'fo' + 'o';
obj[tmpCompProp];
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
