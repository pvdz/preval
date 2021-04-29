# Preval test case

# class.md

> Normalize > Call > Bad callees > Class
>
> Certain values can be statically determined to trigger a runtime error when they're called

#TODO

## Input

`````js filename=intro
$('before');
(class x{}());
$('after');
`````

## Pre Normal

`````js filename=intro
$('before');
(class x {}());
$('after');
`````

## Normalized

`````js filename=intro
$('before');
const tmpCallCallee = class x {};
tmpCallCallee();
$('after');
`````

## Output

`````js filename=intro
$('before');
const tmpCallCallee = class x {};
tmpCallCallee();
$('after');
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: 'before'
 - eval returned: ("<crash[ Class constructor x cannot be invoked without 'new' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
