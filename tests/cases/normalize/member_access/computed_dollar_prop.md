# Preval test case

# computed_dollar.md

> normalize > member_access > computed_dollar
>
> Regression: computed property name of dollar was not inlined

#TODO

## Input

`````js filename=intro
//const a = {['$']() { $(1); }};
a['$']();
`````

## Normalized

`````js filename=intro
a.$();
`````

## Output

`````js filename=intro
a.$();
`````

## Globals

BAD@! Found 1 implicit global bindings:

a

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
