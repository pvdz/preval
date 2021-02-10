# Preval test case

# call.md

> normalize > new > call
>
> Make sure empty array works

## Input

`````js filename=intro
$([]);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: []
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
