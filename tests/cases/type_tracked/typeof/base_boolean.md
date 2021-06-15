# Preval test case

# base_boolean.md

> Type tracked > Typeof > Base boolean
>
> If we know the type of a value without knowing the actual value, we can still resolve `typeof`

#TODO

## Input

`````js filename=intro
const x = $(1) === $(2);
$(typeof x);
`````

## Pre Normal

`````js filename=intro
const x = $(1) === $(2);
$(typeof x);
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const x = tmpBinBothLhs === tmpBinBothRhs;
const tmpCallCallee = $;
const tmpCalleeParam = typeof x;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
$(2);
$(`boolean`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'boolean'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
