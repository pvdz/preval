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

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
