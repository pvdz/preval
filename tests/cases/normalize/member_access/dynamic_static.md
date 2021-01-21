# Preval test case

# dynamic_static.md

> normalize > member_access > dynamic_static
>
> Member expressions with literal keys should be inlined

## Input

`````js filename=intro
const obj = {foo: 10};
$(obj['foo']);
`````

## Normalized

`````js filename=intro
var tmpArg;
const obj = { foo: 10 };
tmpArg = obj.foo;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
const obj = { foo: 10 };
tmpArg = obj.foo;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: undefined

Normalized calls: Same

Final output calls: Same
