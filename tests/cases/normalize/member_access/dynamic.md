# Preval test case

# dynamic.md

> normalize > member_access > dynamic
>
> Dynamic property access should be normalized like all the other things

## Input

`````js filename=intro
const obj = {foo: 10};
$(obj[$()]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpComputedProp;
const obj = { foo: 10 };
tmpComputedProp = $();
tmpArg = obj[tmpComputedProp];
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpComputedProp;
const obj = { foo: 10 };
tmpComputedProp = $();
tmpArg = obj[tmpComputedProp];
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
