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

## Uniformed

`````js filename=intro
var x;
var x = { x: 8 };
x = x.x;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
const obj = { foo: 10 };
tmpArg = obj.foo;
$(tmpArg);
`````
