# Preval test case

# computed_dollar_member_var.md

> Normalize > Member access > Computed dollar member var
>
> Regression: computed property name of dollar was not inlined

#TODO

## Input

`````js filename=intro
const a = {['$']: 1};
const b = a['$'];
$(b);
`````

## Pre Normal

`````js filename=intro
const a = { ['$']: 1 };
const b = a['$'];
$(b);
`````

## Normalized

`````js filename=intro
const a = { $: 1 };
const b = a.$;
$(b);
`````

## Output

`````js filename=intro
const a = { $: 1 };
const b = a.$;
$(b);
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
