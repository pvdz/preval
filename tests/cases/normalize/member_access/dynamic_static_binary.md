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
var tmpArg;
var tmpComputedProp;
const obj = { foo: 10 };
tmpComputedProp = 'fo' + 'o';
tmpArg = obj[tmpComputedProp];
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpComputedProp;
const obj = { foo: 10 };
tmpComputedProp = 'foo';
tmpArg = obj[tmpComputedProp];
$(tmpArg);
`````

## Result

Should call `$` with:
[[10], null];

Normalized calls: Same

Final output calls: Same
