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
var tmpComputedObj;
var tmpComputedProp;
const obj = { foo: 10 };
tmpComputedObj = obj;
tmpComputedProp = 'fo' + 'o';
tmpArg = tmpComputedObj[tmpComputedProp];
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpComputedObj;
var tmpComputedProp;
const obj = { foo: 10 };
tmpComputedObj = obj;
tmpComputedProp = 'foo';
tmpArg = tmpComputedObj[tmpComputedProp];
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: undefined

Normalized calls: Same

Final output calls: Same
