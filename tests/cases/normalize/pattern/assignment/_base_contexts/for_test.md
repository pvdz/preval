# Preval test case

# for_test.md

> Normalize > Pattern > Assignment > Base contexts > For test
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
for ({ x } = 1;false;) y;
`````

## Pre Normal

`````js filename=intro
{
  ({ x: x } = 1);
  while (false) {
    y;
  }
}
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = 1;
x = tmpAssignObjPatternRhs.x;
`````

## Output

`````js filename=intro
x = (1).x;
`````

## PST Output

With rename=true

`````js filename=intro
x = 1.x;
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
