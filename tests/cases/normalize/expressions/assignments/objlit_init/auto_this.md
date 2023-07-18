# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Objlit init > Auto this
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = this) });
$(a);

//*/// (end of file artifact)
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = undefined) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = { x: undefined };
$(tmpCalleeParam);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: undefined };
$( a );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: 'undefined' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
