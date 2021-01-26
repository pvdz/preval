# Preval test case

# dynamic_static.md

> normalize > member_access > dynamic_static
>
> Member expressions with literal keys should be inlined

## Input

`````js filename=intro
const obj = {foo: 10};
obj['foo'];
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
obj.foo;
`````

## Output

`````js filename=intro
const obj = { foo: 10 };
obj.foo;
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
