# Preval test case

# multiple_args.md

> Global casting > String > Multiple args
>
> Calling global constructors to cast when the call is redundant should be eliminated

#TODO

## Input

`````js filename=intro
const a = $('a');
const x = ''+a;
const y = String(x, 1, "twee");
$(y);
`````

## Pre Normal

`````js filename=intro
const a = $(`a`);
const x = `` + a;
const y = String(x, 1, `twee`);
$(y);
`````

## Normalized

`````js filename=intro
const a = $(`a`);
const x = $coerce(a, `plustr`);
const tmpArgOverflow = x;
const tmpStringFirstArg = tmpArgOverflow;
const y = $coerce(tmpStringFirstArg, `string`);
$(y);
`````

## Output

`````js filename=intro
const a = $(`a`);
const x = $coerce(a, `plustr`);
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
