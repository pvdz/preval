# Preval test case

# member_prop.md

> normalize > nullish > member_prop
>
> nullish chaining fun

#TODO

## Input

`````js filename=intro
const x = 10;
$(x??length);
`````

## Normalized

`````js filename=intro
const x = 10;
const tmpCallCallee = $;
let tmpCalleeParam = x;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = length;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const x = 10;
const tmpCallCallee = $;
let tmpCalleeParam = x;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = length;
}
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
