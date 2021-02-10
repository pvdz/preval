# Preval test case

# if_false.md

> ifelse > simple > if_false
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
