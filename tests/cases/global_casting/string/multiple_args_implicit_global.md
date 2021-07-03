# Preval test case

# multiple_args_implicit_global.md

> Global casting > String > Multiple args implicit global
>
> Calling global constructors to cast when the call is redundant should be eliminated

#TODO

## Input

`````js filename=intro
const a = $('a');
const x = ''+a;
const y = String(x, $, 1, fail_hard, "twee");
$(y);
`````

## Pre Normal

`````js filename=intro
const a = $(`a`);
const x = `` + a;
const y = String(x, $, 1, fail_hard, `twee`);
$(y);
`````

## Normalized

`````js filename=intro
const a = $(`a`);
const x = $coerce(a, `plustr`);
const tmpStringFirstArg = x;
fail_hard;
const y = $coerce(tmpStringFirstArg, `string`);
$(y);
`````

## Output

`````js filename=intro
const a = $(`a`);
const x = $coerce(a, `plustr`);
fail_hard;
$(x);
`````

## Globals

BAD@! Found 1 implicit global bindings:

fail_hard

## Result

Should call `$` with:
 - 1: 'a'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
