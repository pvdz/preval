# Preval test case

# number_arr.md

> Normalize > Spread > Number arr
>
> Spread on number is an error

## Input

`````js filename=intro
const x = 100;
$([...x]);
$('fail');
`````

## Pre Normal


`````js filename=intro
const x = 100;
$([...x]);
$(`fail`);
`````

## Normalized


`````js filename=intro
const x = 100;
const tmpCallCallee = $;
const tmpCalleeParam = [...x];
tmpCallCallee(tmpCalleeParam);
$(`fail`);
`````

## Output


`````js filename=intro
[...100];
throw `[Preval]: Array spread must crash before this line`;
`````

## PST Output

With rename=true

`````js filename=intro
[ ... 100 ];
throw "[Preval]: Array spread must crash before this line";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
