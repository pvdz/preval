# Preval test case

# string_obj_twice.md

> Normalize > Spread > String obj twice
>
> Spread on number is an error

#TODO

## Input

`````js filename=intro
const x = "hello";
const y = "world";
$({...x, ...y});
`````

## Pre Normal

`````js filename=intro
const x = `hello`;
const y = `world`;
$({ ...x, ...y });
`````

## Normalized

`````js filename=intro
const x = `hello`;
const y = `world`;
const tmpCallCallee = $;
const tmpCalleeParam = { ...x, ...y };
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = { 0: `h`, 1: `e`, 2: `l`, 3: `l`, 4: `o`, 0: `w`, 1: `o`, 2: `r`, 3: `l`, 4: `d` };
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 0: '"w"', 1: '"o"', 2: '"r"', 3: '"l"', 4: '"d"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same