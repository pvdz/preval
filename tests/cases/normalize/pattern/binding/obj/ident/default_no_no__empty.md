# Preval test case

# default_no_no__empty.md

> Normalize > Pattern > Binding > Obj > Ident > Default no no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x } = 1;
$('bad');
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = 1;
const x = $tdz$__pattern_after_default.x;
$('bad');
`````

## Output

`````js filename=intro
(1).x;
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'bad'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
