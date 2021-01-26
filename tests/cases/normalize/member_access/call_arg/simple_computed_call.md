# Preval test case

# dynamic.md

> normalize > member_access > dynamic
>
> Dynamic property access should be normalized like all the other things

## Input

`````js filename=intro
const obj = {foo: 10};
$(obj[$('foo')]);
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
const tmpCallCallee = $;
const tmpCalleeParam = obj[$('foo')];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const obj = { foo: 10 };
const tmpCallCallee = $;
const tmpCalleeParam = obj[$('foo')];
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 0: "foo"
 - 1: 10
 - 2: undefined

Normalized calls: Same

Final output calls: Same
