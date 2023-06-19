# Preval test case

# template_with_escapd_dollar_escaped_brace.md

> Templates > Template with escapd dollar escaped brace
>
> Make sure strings that contain `${` are properly converted to templates without breaking them

#TODO

## Input

`````js filename=intro
$('$\\{');
`````

## Pre Normal

`````js filename=intro
$(`\$\\{`);
`````

## Normalized

`````js filename=intro
$(`\$\\{`);
`````

## Output

`````js filename=intro
$(`\$\\{`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$\\{'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same