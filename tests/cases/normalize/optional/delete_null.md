# Preval test case

# delete_null.md

> Normalize > Optional > Delete null
>
> Delete on member expression is special casing. Works with optional chaining.

#TODO

## Input

`````js filename=intro
$(delete null?.x);
`````

## Pre Normal

`````js filename=intro
$(delete null?.x);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpDeleteOpt = null;
let tmpCalleeParam = true;
const tmpIfTest = tmpDeleteOpt != null;
if (tmpIfTest) {
  tmpCalleeParam = delete tmpDeleteOpt.x;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(true);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
