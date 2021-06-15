# Preval test case

# stmt_tdz.md

> Normalize > Identifier > Stmt tdz
>
> Known ident that will trigger tdz will still be eliminated, for now. Impossible to safely detect but we can improve some cases later.

#TODO

## Options

TDZ errors are not properly emulated so a n eval mismatch is expected

- skipEval

## Input

`````js filename=intro
x;
let x = 10;
$('fail');
`````

## Pre Normal

`````js filename=intro
null;
let x = 10;
$(`fail`);
`````

## Normalized

`````js filename=intro
let x = 10;
$(`fail`);
`````

## Output

`````js filename=intro
$(`fail`);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
