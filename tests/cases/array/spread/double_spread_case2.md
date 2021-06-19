# Preval test case

# double_spread_case2.md

> Array > Spread > Double spread case2
>
> Spreading an array into another array that is assigned to a binding

A double spread has the danger of the first case messing with indexes for the second case.

The spreads must be resolved in a first step, back to front, and injections should happen in a second step, also back to front.

#TODO

## Input

`````js filename=intro
const x = [];
const y = [];
const aa = [];
const zz = [];
$(aa, zz, a, b);
`````

## Pre Normal

`````js filename=intro
const x = [];
const y = [];
const aa = [];
const zz = [];
$(aa, zz, a, b);
`````

## Normalized

`````js filename=intro
const x = [];
const y = [];
const aa = [];
const zz = [];
$(aa, zz, a, b);
`````

## Output

`````js filename=intro
const aa = [];
const zz = [];
$(aa, zz, a, b);
`````

## Globals

BAD@! Found 2 implicit global bindings:

a, b

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
