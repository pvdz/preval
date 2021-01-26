# Preval test case

# dynamic_static.md

> normalize > member_access > dynamic_static
>
> Member expressions with literal keys should be inlined. When they are static expressions they should still be normalized after normalization.

## Input

`````js filename=intro
const obj = {foo: 10};
let x = 10;
x = obj['fo' + 'o'];
$(x);
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
let x = 10;
x = obj['fo' + 'o'];
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
 - 0: 10
 - 1: undefined

Normalized calls: Same

Final output calls: Same
