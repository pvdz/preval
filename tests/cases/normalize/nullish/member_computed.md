# Preval test case

# member_computed.md

> normalize > nullish > member_computed
>
> nullish chaining fun

#TODO

## Input

`````js filename=intro
const x = 10;
$(x??[20]);
`````

## Normalized

`````js filename=intro
const x = 10;
const tmpCallCallee = $;
let tmpCalleeParam = x;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = [20];
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
