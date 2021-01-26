# Preval test case

# dynamic.md

> normalize > member_access > dynamic
>
> Dynamic property access should be normalized like all the other things

## Input

`````js filename=intro
const obj = {foo: 10};
let x = obj[$('foo')];
$(x);
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
let x = obj[$('foo')];
$(x);
`````

## Output

`````js filename=intro
const obj = { foo: 10 };
let x = obj[$('foo')];
$(x);
`````

## Result

Should call `$` with:
 - 0: "foo"
 - 1: 10
 - 2: undefined

Normalized calls: Same

Final output calls: Same
