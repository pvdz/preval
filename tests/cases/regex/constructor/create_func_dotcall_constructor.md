# Preval test case

# create_func_dotcall_constructor.md

> Regex > Constructor > Create func dotcall constructor
>
> Creating a function and calling it...

The system knows `regex.constructor` maps to `RegExp` and should be able to deal with this

#TODO

## Input

`````js filename=intro
const f = /foo/.constructor('bar', 'g');
$(f);
`````

## Pre Normal


`````js filename=intro
const f = /foo/.constructor(`bar`, `g`);
$(f);
`````

## Normalized


`````js filename=intro
const tmpCallObj = /foo/;
const f = tmpCallObj.constructor(`bar`, `g`);
$(f);
`````

## Output


`````js filename=intro
const f = /bar/g;
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = /bar/g;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
