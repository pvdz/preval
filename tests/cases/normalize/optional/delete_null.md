# Preval test case

# delete_null.md

> normalize > optional > delete_null
>
> Delete on member expression is special casing. Works with optional chaining.

#TODO

## Input

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
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let tmpCalleeParam = true;
const tmpIfTest = null != null;
if (tmpIfTest) {
  tmpCalleeParam = delete null.x;
}
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
