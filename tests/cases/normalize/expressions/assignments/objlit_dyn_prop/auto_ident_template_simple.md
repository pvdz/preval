# Preval test case

# auto_ident_template_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident template simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = `fo${1}o`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = `fo` + 1 + `o`;
$(a);
`````

## Normalized

`````js filename=intro
const tmpBinLhs = `fo1`;
let a = tmpBinLhs + `o`;
$(a);
`````

## Output

`````js filename=intro
$(`fo1o`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'fo1o'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
