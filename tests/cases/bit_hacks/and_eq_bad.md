# Preval test case

# and_eq_bad.md

> Bit hacks > And eq bad
>
> Meh

#TODO

## Input

`````js filename=intro
const x = $('32768');
const y = x & 32768;
const z = y === 32768;
$(z);
`````

## Pre Normal

`````js filename=intro
const x = $(`32768`);
const y = x & 32768;
const z = y === 32768;
$(z);
`````

## Normalized

`````js filename=intro
const x = $(`32768`);
const y = x & 32768;
const z = y === 32768;
$(z);
`````

## Output

`````js filename=intro
const x = $(`32768`);
const y = x & 32768;
const z = y === 32768;
$(z);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '32768'
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
