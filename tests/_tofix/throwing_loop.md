# Preval test case

# throwing_loop.md

> Tofix > Throwing loop
>
> One of the fake loops; a loop that always throws is not a loop

## Input

`````js filename=intro
while (true) {
  throw 'repeat after me';
}
$(1);
`````

## Pre Normal


`````js filename=intro
while (true) {
  throw `repeat after me`;
}
$(1);
`````

## Normalized


`````js filename=intro
while (true) {
  throw `repeat after me`;
}
`````

## Output


`````js filename=intro
throw `repeat after me`;
`````

## PST Output

With rename=true

`````js filename=intro
throw "repeat after me";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ repeat after me ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
