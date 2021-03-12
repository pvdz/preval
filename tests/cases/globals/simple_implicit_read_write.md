# Preval test case

# simple_implicit_read_write.md

> Globals > Simple implicit read write
>
> Writing to an implicit global

#TODO

## Input

`````js filename=intro
$(a);
$(a = 5);
`````

## Pre Normal

`````js filename=intro
$(a);
$((a = 5));
`````

## Normalized

`````js filename=intro
$(a);
const tmpCallCallee = $;
a = 5;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(5);
a = 5;
$(5);
`````

## Globals

BAD@! Found 1 implicit global bindings:

a

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: BAD!!
 - 1: 5
 - eval returned: ('<crash[ <ref> is not defined ]>')
