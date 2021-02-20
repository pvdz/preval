# Preval test case

# if_void_dollar.md

> Ifelse > Harder > If void dollar
>
> Eliminate simple tautology

This should reduce into $(1)

## Input

`````js filename=intro
if (void $(1)) $(2);
`````

## Normalized

`````js filename=intro
$(1);
const tmpIfTest = undefined;
if (tmpIfTest) {
  $(2);
}
`````

## Output

`````js filename=intro
$(1);
if (undefined) {
  $(2);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
