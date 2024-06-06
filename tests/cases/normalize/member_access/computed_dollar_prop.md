# Preval test case

# computed_dollar_prop.md

> Normalize > Member access > Computed dollar prop
>
> Regression: computed property name of dollar was not inlined

#TODO

## Input

`````js filename=intro
const a = {['$']() { $(1); }};
a['$']();
`````

## Pre Normal


`````js filename=intro
const a = {
  [`\$`]() {
    debugger;
    $(1);
  },
};
a[`\$`]();
`````

## Normalized


`````js filename=intro
const a = {
  $() {
    debugger;
    $(1);
    return undefined;
  },
};
a.$();
`````

## Output


`````js filename=intro
const a = {
  $() {
    debugger;
    $(1);
    return undefined;
  },
};
a.$();
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $(  ) {
  debugger;
  $( 1 );
  return undefined;
}, };
a.$();
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
