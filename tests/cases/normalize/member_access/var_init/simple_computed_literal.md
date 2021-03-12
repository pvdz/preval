# Preval test case

# simple_computed_literal.md

> Normalize > Member access > Var init > Simple computed literal
>
> Member expressions with literal keys should be inlined

## Input

`````js filename=intro
const obj = {foo: 10};
let x = obj['foo'];
$(x);
`````

## Pre Normal

`````js filename=intro
const obj = { foo: 10 };
let x = obj['foo'];
$(x);
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
let x = obj.foo;
$(x);
`````

## Output

`````js filename=intro
const obj = { foo: 10 };
const x = obj.foo;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
