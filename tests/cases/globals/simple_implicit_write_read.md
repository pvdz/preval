# Preval test case

# simple_implicit_write_read.md

> Globals > Simple implicit write read
>
> Writing to an implicit global

#TODO

## Input

`````js filename=intro
$(a = 5);
$(a);
`````

## Pre Normal

`````js filename=intro
$((a = 5));
$(a);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
a = 5;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
a = 5;
a;
$(a);
$(a);
`````

## Globals

BAD@! Found 1 implicit global bindings:

a

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
