# Preval test case

# base_regex.md

> Type tracked > Typeof > Base regex
>
> If we know the type of a value without knowing the actual value, we can still resolve `typeof`

#TODO

## Input

`````js filename=intro
const x = /foo/;
$(typeof x);
`````

## Pre Normal

`````js filename=intro
const x = /foo/;
$(typeof x);
`````

## Normalized

`````js filename=intro
const x = /foo/;
const tmpCallCallee = $;
const tmpCalleeParam = typeof x;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('object');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'object'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
