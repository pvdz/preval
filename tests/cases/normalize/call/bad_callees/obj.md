# Preval test case

# obj.md

> Normalize > Call > Bad callees > Obj
>
> Certain values can be statically determined to trigger a runtime error when they're called

#TODO

## Input

`````js filename=intro
$('before');
({a: 1, b: 2}());
$('after');
`````

## Pre Normal


`````js filename=intro
$(`before`);
({ a: 1, b: 2 }());
$(`after`);
`````

## Normalized


`````js filename=intro
$(`before`);
const tmpCallComplexCallee = { a: 1, b: 2 };
tmpCallComplexCallee();
$(`after`);
`````

## Output


`````js filename=intro
$(`before`);
const tmpCallComplexCallee = { a: 1, b: 2 };
tmpCallComplexCallee();
$(`after`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "before" );
const a = {
  a: 1,
  b: 2,
};
a();
$( "after" );
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
