# Preval test case

# base_false.md

> Regex > Test > Base false
>
> We can resolve regex.test if we know the regex and the arg

#TODO

## Input

`````js filename=intro
$(/foo/.test("brafonody"));
`````

## Pre Normal


`````js filename=intro
$(/foo/.test(`brafonody`));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCallObj = /foo/;
const tmpCalleeParam = tmpCallObj.test(`brafonody`);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(false);
`````

## PST Output

With rename=true

`````js filename=intro
$( false );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
