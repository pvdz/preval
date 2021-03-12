# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Arr spread > Auto this
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = this)]);
$(a);

//*/// (end of file artifact)
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = this)]);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = this;
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const SSA_a = this;
const tmpCalleeParam = [...SSA_a];
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
