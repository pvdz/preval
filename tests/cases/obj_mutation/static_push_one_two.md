# Preval test case

# static_push_one_two.md

> Obj mutation > Static push one two
>
> Testing the inlining of objlit mutations

In this particular case the array could be initialized with the numbers immediately.

#TODO

## Input

`````js filename=intro
const blob = {thing: 'woop'};
blob.thing = 'boing';
blob.thing = 'boom';
$(blob);
`````

## Pre Normal

`````js filename=intro
const blob = { thing: `woop` };
blob.thing = `boing`;
blob.thing = `boom`;
$(blob);
`````

## Normalized

`````js filename=intro
const blob = { thing: `woop` };
blob.thing = `boing`;
blob.thing = `boom`;
$(blob);
`````

## Output

`````js filename=intro
const blob = { thing: `boom` };
$(blob);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { thing: '"boom"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
