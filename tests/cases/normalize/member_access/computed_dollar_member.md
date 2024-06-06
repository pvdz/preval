# Preval test case

# computed_dollar_member.md

> Normalize > Member access > Computed dollar member
>
> Regression: computed property name of dollar was not inlined

#TODO

## Input

`````js filename=intro
const a = {['$']: 1};
$(a['$']);
`````

## Pre Normal


`````js filename=intro
const a = { [`\$`]: 1 };
$(a[`\$`]);
`````

## Normalized


`````js filename=intro
const a = { $: 1 };
const tmpCallCallee = $;
const tmpCalleeParam = a.$;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
