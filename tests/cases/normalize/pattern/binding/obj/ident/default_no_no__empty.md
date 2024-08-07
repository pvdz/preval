# Preval test case

# default_no_no__empty.md

> Normalize > Pattern > Binding > Obj > Ident > Default no no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x } = 1;
$('bad');
`````

## Pre Normal


`````js filename=intro
const { x: x } = 1;
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = 1;
const x = bindingPatternObjRoot.x;
$(`bad`);
`````

## Output


`````js filename=intro
(1).x;
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
1.x;
$( "bad" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'bad'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
