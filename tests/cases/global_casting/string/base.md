# Preval test case

# base.md

> Global casting > String > Base
>
> Calling global constructors to cast when the call is redundant should be eliminated

#TODO

## Input

`````js filename=intro
const a = $('a');
const x = '' + a;
const y = String(x);
$(y);
`````

## Pre Normal

`````js filename=intro
const a = $(`a`);
const x = `` + a;
const y = String(x);
$(y);
`````

## Normalized

`````js filename=intro
const a = $(`a`);
const x = `` + a;
const y = String(x);
$(y);
`````

## Output

`````js filename=intro
const a = $(`a`);
const x = `` + a;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same