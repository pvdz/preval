# Preval test case

# base.md

> Type tracked > Regex method > Base
>
> Regex method call inlining

## Input

`````js filename=intro
$(/foo/.test('hello foo world'));
`````

## Pre Normal

`````js filename=intro
$(/foo/.test(`hello foo world`));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCallObj = /foo/;
const tmpCalleeParam = tmpCallObj.test(`hello foo world`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(true);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
