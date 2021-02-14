# Preval test case

# base.md

> normalize > function > expr > base
>
> a func expr is slightly different from func expr

#TODO

## Input

`````js filename=intro
const f = function g() {};
$(f);
`````

## Normalized

`````js filename=intro
const f = function g() {};
$(f);
`````

## Output

`````js filename=intro
const f = function g() {};
$(f);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
