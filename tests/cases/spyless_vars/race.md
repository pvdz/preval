# Preval test case

# race.md

> Spyless vars > Race
>
> Assignments of all kinds should be normalized in all circumstances

Multiple vars racing competing for the same place.

## Input

`````js filename=intro
let y = 2
let z = [10, 20, 30];
let tmpSwitchCaseToStart = 1;
if ($('a') === $) tmpSwitchCaseToStart = 0;
$(a, z);
`````

## Pre Normal


`````js filename=intro
let y = 2;
let z = [10, 20, 30];
let tmpSwitchCaseToStart = 1;
if ($(`a`) === $) tmpSwitchCaseToStart = 0;
$(a, z);
`````

## Normalized


`````js filename=intro
let y = 2;
let z = [10, 20, 30];
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(`a`);
const tmpIfTest = tmpBinLhs === $;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
$(a, z);
`````

## Output


`````js filename=intro
$(`a`);
const z = [10, 20, 30];
$(a, z);
`````

## PST Output

With rename=true

`````js filename=intro
$( "a" );
const a = [ 10, 20, 30 ];
$( a, a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

a

## Result

Should call `$` with:
 - 1: 'a'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
