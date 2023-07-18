# Preval test case

# member_prop.md

> Normalize > Nullish > Member prop
>
> nullish chaining fun

#TODO

## Input

`````js filename=intro
const x = 10;
$(x??length);
`````

## Pre Normal

`````js filename=intro
const x = 10;
$(x ?? length);
`````

## Normalized

`````js filename=intro
const x = 10;
const tmpCallCallee = $;
let tmpCalleeParam = x;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = length;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(10);
`````

## PST Output

With rename=true

`````js filename=intro
$( 10 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
