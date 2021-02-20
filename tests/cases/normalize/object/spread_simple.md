# Preval test case

# spread_simple.md

> Normalize > Object > Spread simple
>
> Spread arg that is simple should not change

#TODO

## Input

`````js filename=intro
const obj = { foo: { bar: 10 } };
$({...obj});
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { bar: 10 };
const obj = { foo: tmpObjLitVal };
const tmpCallCallee = $;
const tmpCalleeParam = { ...obj };
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { bar: 10 };
const obj = { foo: tmpObjLitVal };
const tmpCalleeParam = { ...obj };
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { foo: '{"bar":"10"}' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
