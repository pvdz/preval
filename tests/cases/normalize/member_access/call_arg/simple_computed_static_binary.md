# Preval test case

# dynamic_static.md

> normalize > member_access > dynamic_static
>
> Member expressions with literal keys should be inlined. When they are static expressions they should still be normalized after normalization.

## Input

`````js filename=intro
const obj = {foo: 10};
$(obj['fo' + 'o']);
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
const tmpCallCallee = $;
const tmpCalleeParam = obj['fo' + 'o'];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const obj = { foo: 10 };
const tmpCallCallee = $;
const tmpCalleeParam = obj.foo;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: undefined

Normalized calls: Same

Final output calls: Same
