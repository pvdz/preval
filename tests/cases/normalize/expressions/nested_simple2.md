# Preval test case

# nested_simple2.md

> Normalize > Expressions > Nested simple2
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
        let a = undefined;
        let c = undefined;
        let tmpSSA_a = 10;
        let tmpSSA_c = 30;
        tmpSSA_c;
        let tmpSSA_a$1 = c;
        const tmpCalleeParam = tmpSSA_a$1;
        $(tmpCalleeParam);

`````

## Pre Normal

`````js filename=intro
let a = undefined;
let c = undefined;
let tmpSSA_a = 10;
let tmpSSA_c = 30;
null;
let tmpSSA_a$1 = c;
const tmpCalleeParam = tmpSSA_a$1;
$(tmpCalleeParam);
`````

## Normalized

`````js filename=intro
let a = undefined;
let c = undefined;
let tmpSSA_a = 10;
let tmpSSA_c = 30;
let tmpSSA_a$1 = c;
const tmpCalleeParam = tmpSSA_a$1;
$(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
