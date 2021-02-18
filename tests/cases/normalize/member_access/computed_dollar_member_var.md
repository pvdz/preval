# Preval test case

# computed_dollar.md

> normalize > member_access > computed_dollar
>
> Regression: computed property name of dollar was not inlined

#TODO

## Input

`````js filename=intro
const a = {['$']: 1};
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

Normalized calls: Same

Final output calls: Same
