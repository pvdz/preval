# Preval test case

# inline_obj_spread.md

> Tofix > Inline obj spread
>
> Spread arg that is simple should not change

The first object literal should be spread into the second object literal when we have full visibility

## Input

`````js filename=intro
const obj = { foo: { bar: 10 } };
$({...obj.foo});
`````

## PST Output:

With rename=true

`````js filename=intro
const a = { bar: 10 };
const b = { ... a };
$( b );
`````

## PST Output:

With rename=true

`````js filename=intro
const a = { bar: 10 };
const b = { ... a };
$( b );
`````

## Pre Normal


`````js filename=intro
const obj = { foo: { bar: 10 } };
$({ ...obj.foo });
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
const tmpCalleeParam = { ...tmpObjLitVal };
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { bar: 10 };
const b = { ... a };
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { bar: '10' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
