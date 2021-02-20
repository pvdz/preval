# Preval test case

# computed_key_number.md

> Normalize > Object > Computed key number
>
> Computed key that is a number value might as well not be computed

#TODO

## Input

`````js filename=intro
$({[100]: 10});
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = { [100]: 10 };
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = { [100]: 10 };
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 100: '10' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
