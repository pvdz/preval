# Preval test case

# spread_member.md

> normalize > array > spread_member
>
> Spread arg that is simple should not change

#TODO

## Input

`````js filename=intro
const obj = { foo: { bar: 10 } };
$({...obj.foo});
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { bar: 10 };
const obj = { foo: tmpObjLitVal };
const tmpCallCallee = $;
const tmpObjSpread = obj.foo;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { bar: 10 };
const obj = { foo: tmpObjLitVal };
const tmpCallCallee = $;
const tmpObjSpread = obj.foo;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { bar: '10' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
