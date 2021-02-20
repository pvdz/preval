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

## Normalized

`````js filename=intro
const a = {
  $() {
    $(1);
  },
};
a.$();
`````

## Output

`````js filename=intro
const a = {
  $() {
    $(1);
  },
};
a.$();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
