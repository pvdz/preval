# Preval test case

# if_excl_void_dollar.md

> Ifelse > Harder > If excl void dollar
>
> Eliminate simple tautology

This should decompose into calling $(1) and $(2)

## Input

`````js filename=intro
if (!void $(1)) $(2);
`````

## Normalized

`````js filename=intro
$(1);
const tmpIfTest = undefined;
if (tmpIfTest) {
} else {
  $(2);
}
`````

## Output

`````js filename=intro
$(1);
if (undefined) {
} else {
  $(2);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
