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

## Normalized

`````js filename=intro
const a = { $: 1 };
const tmpCallCallee = $;
const tmpCalleeParam = a.$;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const a = { $: 1 };
const tmpCalleeParam = a.$;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
