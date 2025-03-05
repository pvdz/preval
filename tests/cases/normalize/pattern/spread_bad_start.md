# Preval test case

# spread_bad_start.md

> Normalize > Pattern > Spread bad start
>
> Only valid spread literal is a string

## Input

`````js filename=intro
$('before');
$([...3, 4,5 ]);
$('after');
`````

## Pre Normal


`````js filename=intro
$(`before`);
$([...3, 4, 5]);
$(`after`);
`````

## Normalized


`````js filename=intro
$(`before`);
const tmpCalleeParam = [...3];
throw `[Preval]: Array spread must crash before this line`;
`````

## Output


`````js filename=intro
$(`before`);
[...3];
throw `[Preval]: Array spread must crash before this line`;
`````

## PST Output

With rename=true

`````js filename=intro
$( "before" );
[ ...3 ];
throw "[Preval]: Array spread must crash before this line";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
