# Preval test case

# base_true.md

> Regex > Test > Base true
>
> We can resolve regex.test if we know the regex and the arg

## Input

`````js filename=intro
$(/foo/.test("brafoody"));
`````

## Pre Normal


`````js filename=intro
$(/foo/.test(`brafoody`));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCallObj = /foo/;
const tmpCalleeParam = tmpCallObj.test(`brafoody`);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
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
