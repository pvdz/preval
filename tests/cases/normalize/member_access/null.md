# Preval test case

# null.md

> Normalize > Member access > Null
>
> Accessing a prop on null

#TODO

## Input

`````js filename=intro
null.foo
`````

## Pre Normal

`````js filename=intro
null.foo;
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
