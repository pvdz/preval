# Preval test case

# simple_computed_literal.md

> Normalize > Member access > Statement > Global > Simple computed literal
>
> Member expressions with literal keys should be inlined

## Input

`````js filename=intro
const obj = {foo: 10};
obj['foo'];
`````

## Pre Normal

`````js filename=intro
const obj = { foo: 10 };
obj[`foo`];
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
obj.foo;
`````

## Output

`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
