# Preval test case

# spread_call.md

> normalize > array > spread_call
>
> Spread arg that is simple should not change

#TODO

## Input

`````js filename=intro
$([...$("foo")]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
tmpElement = $('foo');
tmpArg = [...tmpElement];
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
tmpElement = $('foo');
tmpArg = [...tmpElement];
$(tmpArg);
`````

## Result

Should call `$` with:
[['foo'], '<crash[ <ref> is not iterable ]>'];

Normalized calls: Same

Final output calls: Same
