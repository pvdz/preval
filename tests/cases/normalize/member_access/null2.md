# Preval test case

# null2.md

> Normalize > Member access > Null2
>
> Accessing a prop on null

#TODO

## Input

`````js filename=intro
null.foo
throw 'foo\`bar\`'
`````

## Pre Normal


`````js filename=intro
null.foo;
throw `foo\`bar\``;
`````

## Normalized


`````js filename=intro
null.foo;
throw `[Preval]: Can not reach here`;
`````

## Output


`````js filename=intro
null.foo;
throw `[Preval]: Can not reach here`;
`````

## PST Output

With rename=true

`````js filename=intro
null.foo;
throw "[Preval]: Can not reach here";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
