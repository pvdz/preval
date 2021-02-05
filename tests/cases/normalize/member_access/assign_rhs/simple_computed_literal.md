# Preval test case

# dynamic_static.md

> normalize > member_access > dynamic_static
>
> Member expressions with literal keys should be inlined

## Input

`````js filename=intro
const obj = {foo: 10};
let x = 10;
x = obj['foo'];
$(x);
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
let x = 10;
x = obj['foo'];
$(x);
`````

## Output

`````js filename=intro
const obj = { foo: 10 };
let x = 10;
x = obj.foo;
$(x);
`````

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
