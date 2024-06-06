# Preval test case

# ternary_alternate.md

> Normalize > Pattern > Assignment > Base contexts > Ternary alternate
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
a ? b : ({ x } = 1);
`````

## Pre Normal


`````js filename=intro
a ? b : ({ x: x } = 1);
`````

## Normalized


`````js filename=intro
if (a) {
  b;
} else {
  const tmpAssignObjPatternRhs = 1;
  x = tmpAssignObjPatternRhs.x;
}
`````

## Output


`````js filename=intro
if (a) {
  b;
} else {
  x = (1).x;
}
`````

## PST Output

With rename=true

`````js filename=intro
if (a) {
  b;
}
else {
  x = 1.x;
}
`````

## Globals

BAD@! Found 3 implicit global bindings:

a, b, x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
