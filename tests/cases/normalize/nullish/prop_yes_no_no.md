# Preval test case

# prop_yes_no_no.md

> normalize > nullish > prop_yes_no_no
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a??b.c.d);
`````

## Normalized

`````js filename=intro
const a = {};
const tmpCallCallee = $;
let tmpCalleeParam = a;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  const tmpAssignRhsProp = b.c;
  tmpCalleeParam = tmpAssignRhsProp.d;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const a = {};
let tmpCalleeParam = a;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  const tmpAssignRhsProp = b.c;
  tmpCalleeParam = tmpAssignRhsProp.d;
}
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
