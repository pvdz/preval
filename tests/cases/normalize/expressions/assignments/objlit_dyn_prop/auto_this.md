# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto this
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = this)]: 10 });
$(a);

//*/// (end of file artifact)
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = undefined)]: 10 });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = { [undefined]: 10 };
$(tmpCalleeParam);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { undefined[ 10 ]: 10 };
$( a );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { undefined: '10' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
